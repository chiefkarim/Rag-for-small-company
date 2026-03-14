import sqlite3
from features.documents.models import DocumentModel, DocumentState
from features.documents import repository as documents_repo


def register_documents(db: sqlite3.Connection, file_names: list[str]) -> list[DocumentModel]:
    """Bulk-register documents with state=pending. Called at the start of ingestion."""
    return documents_repo.bulk_create_documents(db, file_names, state=DocumentState.pending)


def mark_documents_embedded(db: sqlite3.Connection, doc_ids: list[int]) -> None:
    """Mark a batch of documents as successfully embedded."""
    documents_repo.bulk_update_document_states(db, doc_ids, DocumentState.embedded)


def mark_documents_failed(db: sqlite3.Connection, doc_ids: list[int]) -> None:
    """Mark a batch of documents as failed."""
    documents_repo.bulk_update_document_states(db, doc_ids, DocumentState.failed)
