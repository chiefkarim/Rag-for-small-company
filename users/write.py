from pydantic import BaseModel


class CreateUser(BaseModel):
    name: str


class CreateUserProject(BaseModel):
    user_id: int
    project_id: int
