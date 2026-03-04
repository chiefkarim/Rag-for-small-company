from typing import Optional
from pydantic import BaseModel, Field

from models.department import Department


class QueryFilters(BaseModel):
    department: Optional[Department] = None


class QueryRequest(BaseModel):
    filters: Optional[QueryFilters] = None
    query: str = Field(min_length=1)
