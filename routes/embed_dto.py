from typing import Optional
from pydantic import BaseModel

from models.department import Department


class EmbedRequest(BaseModel):
    file_id: str
    department: Department = Department.GENERAL
    project_id: Optional[str]
