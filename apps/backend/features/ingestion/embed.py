import json
import os
import sqlite3
import tempfile

from infrastructure.vector_store_provider import VectorStoreProvider
from features.departments.models import Department
from features.ingestion.reader import file_metadata
from features.documents import service as document_service
from llama_index.readers.docling import DoclingReader
from llama_index.node_parser.docling import DoclingNodeParser
from llama_index.core import VectorStoreIndex

from features.google_drive.google_drive_service import GoogleDriveService


def embed(
    file_ids: list[str],
    project_id: str | None,
    google_drive_service: GoogleDriveService,
    vector_store: VectorStoreProvider,
    db: sqlite3.Connection,
    department: Department = Department.GENERAL,
    batch_size: int = 5,
):
    """
    Download, parse, and embed files from Google Drive.

    Files are processed in batches of `batch_size` to reduce DB round-trips.
    Each file is registered in the documents table as 'pending' upfront.
    After a batch is successfully embedded its documents are marked 'embedded';
    individual failures within a batch are marked 'failed'.
    """
    with tempfile.TemporaryDirectory() as temp_dir:
        reader = DoclingReader(export_type=DoclingReader.ExportType.JSON)
        node_parser = DoclingNodeParser()

        # --- Step 1: Fetch names and register documents with correct names ---
        file_names = []
        for file_id in file_ids:
            try:
                name = google_drive_service.get_file_name(file_id)
                file_names.append(name)
            except Exception as e:
                print(f"Failed to fetch metadata for file_id {file_id}: {e}")
                file_names.append(f"unknown_{file_id}")

        db_docs = document_service.register_documents(db, file_names)

        # Build a mapping from file_id to DB document id
        file_id_to_doc_id: dict[str, int] = {
            file_id: doc.id for file_id, doc in zip(file_ids, db_docs)
        }

        total_nodes = 0
        store = vector_store.get_vector_store()
        index = VectorStoreIndex.from_vector_store(vector_store=store)

        # --- Step 2: Process files in batches ---
        for batch_start in range(0, len(file_ids), batch_size):
            batch_ids = file_ids[batch_start : batch_start + batch_size]

            batch_nodes = []
            batch_succeeded: list[int] = []
            batch_failed: list[int] = []

            for file_id in batch_ids:
                doc_id = file_id_to_doc_id[file_id]
                try:
                    FILE_PATH, file_name = google_drive_service.download_file(
                        temp_dir, file_id
                    )

                    # --- Save metadata file if project_id or department is provided ---
                    if project_id or department:
                        meta_data = {
                            "department": department.value if hasattr(department, 'value') else str(department),
                            "project_id": project_id
                        }
                        meta_file_path = f"{FILE_PATH}.metadata.json"
                        with open(meta_file_path, "w") as f:
                            json.dump(meta_data, f, indent=2)
                        print(f"Saved metadata to {meta_file_path}")

                    documents = reader.load_data(FILE_PATH)

                    for doc in documents:
                        doc.metadata.update(
                            file_metadata(FILE_PATH, department, project_id, file_name)
                        )

                    nodes = node_parser.get_nodes_from_documents(documents, True)
                    batch_nodes.extend(nodes)
                    batch_succeeded.append(doc_id)
                except Exception as e:
                    print(f"Failed to process file_id {file_id}: {e}")
                    batch_failed.append(doc_id)

            # --- Step 3: Embed the batch and update states ---
            if batch_nodes:
                index.insert_nodes(batch_nodes)
                total_nodes += len(batch_nodes)

            if batch_succeeded:
                document_service.mark_documents_embedded(db, batch_succeeded)
            if batch_failed:
                document_service.mark_documents_failed(db, batch_failed)

        return {"status": "success", "nodes_inserted": total_nodes}
