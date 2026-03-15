from typing import Optional
from pydantic import BaseModel




class EmbedRequest(BaseModel):
    file_ids: list[str]
    department: str = "general"
    project_id: Optional[str] = None
