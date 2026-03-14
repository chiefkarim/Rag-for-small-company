from pydantic import BaseModel, ConfigDict
from datetime import datetime
from features.documents.models import DocumentState


class CreateDocument(BaseModel):
    file_name: str
    state: DocumentState = DocumentState.pending
    source_file_update_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)


class UpdateDocument(BaseModel):
    file_name: str
    state: DocumentState | None = None
    source_file_update_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
