from fastapi import Request
from infrastructure.vector_store_provider import VectorStoreProvider
from sqlalchemy.orm import Session

from features.google_drive.google_drive_service import GoogleDriveService


def get_db(request: Request):
    db: Session = request.app.state.db.SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_vector_store(request: Request) -> VectorStoreProvider:
    return request.app.state.vector_store


def get_google_drive(request: Request) -> GoogleDriveService:
    return request.app.state.google_drive
