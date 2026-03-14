from enum import Enum
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class DocumentState(str, Enum):
    pending = "pending"
    embedded = "embedded"
    failed = "failed"


class DocumentModel(BaseModel):
    id: int
    file_name: str
    state: DocumentState = DocumentState.pending
    source_file_update_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
