from fastapi import Request
from typing import cast
from infrastructure.databases.db import DatabaseConfig
from infrastructure.vector_store_provider import VectorStoreProvider
import sqlite3


def get_db(request: Request) -> sqlite3.Connection:
    db = cast(DatabaseConfig, request.app.state.db)
    return db.client


def get_vectore_store(request: Request) -> VectorStoreProvider:
    vector_store = cast(VectorStoreProvider, request.app.state.vector_store)
    return vector_store
