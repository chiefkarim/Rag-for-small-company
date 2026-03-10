import os
import tempfile
import time

from llama_index.core import SimpleDirectoryReader, Settings, readers
from llama_index.core.node_parser import SentenceSplitter
from qdrant_client.grpc import Vector
from infrastructure.vector_store_provider import VectorStoreProvider
from models.department import Department
from .reader import file_metadata
from llama_index.readers.docling import DoclingReader
from llama_index.node_parser.docling import DoclingNodeParser

from services.google_drive.google_drive_service import GoogleDriveService

TEMP_PATH = os.path.join(tempfile.gettempdir(), "/tmp")
OUTPUT_PATH = os.path.join(TEMP_PATH, "tmp_file.pdf")


def stage_timer(stage_name, start):
    elapsed = time.perf_counter() - start
    print(f"[TIMER] {stage_name}: {elapsed:.2f}s")


def embed(
    file_id: str,
    project_id: str | None,
    google_drive_service: GoogleDriveService,
    vector_store: VectorStoreProvider,
    department: Department = Department.GENERAL,
):
    pipeline_start = time.perf_counter()
    google_drive_service.download_file(OUTPUT_PATH, file_id)

    # --- Read documents ---
    reader = DoclingReader(export_type=DoclingReader.ExportType.JSON)
    node_parser = DoclingNodeParser()

    documents = reader.load_data(OUTPUT_PATH)
    for doc in documents:
        doc.metadata.update(file_metadata(OUTPUT_PATH, department))

    nodes = node_parser.get_nodes_from_documents(documents, True)

    # --- Initialize vector store ---
    start = time.perf_counter()

    store = vector_store.get_vector_store()
    stage_timer("Vector store initialization", start)

    # --- Generate embeddings only ---
    start = time.perf_counter()
    embed_model = Settings.embed_model

    texts = [node.get_content() for node in nodes]
    embeddings = embed_model.get_text_embedding_batch(texts, show_progress=True)

    for node, embedding in zip(nodes, embeddings):
        node.embedding = embedding

    stage_timer("Embedding generation only", start)

    # --- Upload to Qdrant only ---
    start = time.perf_counter()
    store.add(nodes)
    stage_timer("Qdrant upload only", start)

    stage_timer("Total pipeline", pipeline_start)
    return {"success"}
