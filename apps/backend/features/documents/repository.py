from sqlalchemy import select, update, delete
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime
from features.documents.models import DocumentModel, DocumentState
from infrastructure.databases.orm import Document


def _row_to_model(row: Document) -> DocumentModel:
    return DocumentModel.model_validate(row)


def get_documents(db: Session) -> list[DocumentModel]:
    rows = db.scalars(select(Document)).all()
    return [_row_to_model(row) for row in rows]


def get_document_by_id(db: Session, id: int) -> Optional[DocumentModel]:
    row = db.get(Document, id)
    return _row_to_model(row) if row else None


def create_document(
    db: Session,
    file_name: str,
    state: DocumentState = DocumentState.pending,
    source_file_update_at: Optional[datetime] = None,
) -> Optional[DocumentModel]:
    new_doc = Document(file_name=file_name, state=state.value, source_file_update_at=source_file_update_at)
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    return _row_to_model(new_doc)


def bulk_create_documents(
    db: Session,
    file_names: list[str],
    state: DocumentState = DocumentState.pending,
) -> list[DocumentModel]:
    """Insert multiple documents in a single transaction. Returns the created documents."""
    documents = []
    for file_name in file_names:
        doc = Document(file_name=file_name, state=state.value)
        db.add(doc)
        documents.append(doc)
    
    db.commit()
    for doc in documents:
        db.refresh(doc)
        
    return [_row_to_model(doc) for doc in documents]


def bulk_update_document_states(
    db: Session,
    doc_ids: list[int],
    state: DocumentState,
) -> None:
    """Update the state of multiple documents in a single transaction."""
    if not doc_ids:
        return
    db.execute(
        update(Document)
        .where(Document.id.in_(doc_ids))
        .values(state=state.value)
    )
    db.commit()


def update_document(
    db: Session,
    id: int,
    file_name: str,
    state: Optional[DocumentState] = None,
    source_file_update_at: Optional[datetime] = None,
) -> Optional[DocumentModel]:
    doc = db.get(Document, id)
    if doc:
        doc.file_name = file_name
        if state is not None:
            doc.state = state.value
        doc.source_file_update_at = source_file_update_at
        db.commit()
        db.refresh(doc)
        return _row_to_model(doc)
    return None


def delete_document(db: Session, id: int) -> bool:
    doc = db.get(Document, id)
    if doc:
        db.delete(doc)
        db.commit()
        return True
    return False
