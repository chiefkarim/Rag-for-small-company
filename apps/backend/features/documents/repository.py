import sqlite3
from typing import Optional
from datetime import datetime
from features.documents.models import DocumentModel, DocumentState


def _row_to_model(row) -> DocumentModel:
    return DocumentModel(
        id=row[0],
        file_name=row[1],
        state=DocumentState(row[2]),
        source_file_update_at=row[3],
        created_at=row[4],
        updated_at=row[5],
    )


def get_documents(db: sqlite3.Connection) -> list[DocumentModel]:
    cursor = db.cursor()
    cursor.execute(
        "SELECT id, file_name, state, source_file_update_at, created_at, updated_at FROM documents"
    )
    rows = cursor.fetchall()
    return [_row_to_model(row) for row in rows]


def get_document_by_id(db: sqlite3.Connection, id: int) -> Optional[DocumentModel]:
    cursor = db.cursor()
    cursor.execute(
        "SELECT id, file_name, state, source_file_update_at, created_at, updated_at FROM documents WHERE id = ?",
        (id,),
    )
    row = cursor.fetchone()
    return _row_to_model(row) if row else None


def create_document(
    db: sqlite3.Connection,
    file_name: str,
    state: DocumentState = DocumentState.pending,
    source_file_update_at: Optional[datetime] = None,
) -> Optional[DocumentModel]:
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO documents (file_name, state, source_file_update_at) VALUES (?, ?, ?) "
        "RETURNING id, file_name, state, source_file_update_at, created_at, updated_at",
        (file_name, state.value, source_file_update_at),
    )
    db.commit()
    row = cursor.fetchone()
    return _row_to_model(row) if row else None


def bulk_create_documents(
    db: sqlite3.Connection,
    file_names: list[str],
    state: DocumentState = DocumentState.pending,
) -> list[DocumentModel]:
    """Insert multiple documents in a single transaction. Returns the created documents."""
    cursor = db.cursor()
    documents: list[DocumentModel] = []
    for file_name in file_names:
        cursor.execute(
            "INSERT INTO documents (file_name, state) VALUES (?, ?) "
            "RETURNING id, file_name, state, source_file_update_at, created_at, updated_at",
            (file_name, state.value),
        )
        row = cursor.fetchone()
        if row:
            documents.append(_row_to_model(row))
    db.commit()
    return documents


def bulk_update_document_states(
    db: sqlite3.Connection,
    doc_ids: list[int],
    state: DocumentState,
) -> None:
    """Update the state of multiple documents in a single transaction."""
    if not doc_ids:
        return
    cursor = db.cursor()
    placeholders = ",".join("?" * len(doc_ids))
    cursor.execute(
        f"UPDATE documents SET state = ?, updated_at = CURRENT_TIMESTAMP WHERE id IN ({placeholders})",
        [state.value, *doc_ids],
    )
    db.commit()


def update_document(
    db: sqlite3.Connection,
    id: int,
    file_name: str,
    state: Optional[DocumentState] = None,
    source_file_update_at: Optional[datetime] = None,
) -> Optional[DocumentModel]:
    cursor = db.cursor()
    if state is not None:
        cursor.execute(
            "UPDATE documents SET file_name = ?, state = ?, source_file_update_at = ?, updated_at = CURRENT_TIMESTAMP "
            "WHERE id = ? RETURNING id, file_name, state, source_file_update_at, created_at, updated_at",
            (file_name, state.value, source_file_update_at, id),
        )
    else:
        cursor.execute(
            "UPDATE documents SET file_name = ?, source_file_update_at = ?, updated_at = CURRENT_TIMESTAMP "
            "WHERE id = ? RETURNING id, file_name, state, source_file_update_at, created_at, updated_at",
            (file_name, source_file_update_at, id),
        )
    db.commit()
    row = cursor.fetchone()
    return _row_to_model(row) if row else None


def delete_document(db: sqlite3.Connection, id: int) -> bool:
    cursor = db.cursor()
    cursor.execute("DELETE FROM documents WHERE id = ?", (id,))
    db.commit()
    return cursor.rowcount > 0
