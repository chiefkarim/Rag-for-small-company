from fastapi import APIRouter, Depends
import sqlite3
from deps import get_db
from .users_dto import CreateUserProject
from models.user import UserProject

router = APIRouter(prefix="/users-projects")


@router.post("/", response_model=UserProject)
async def create_user_project(
    payload: CreateUserProject, db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.execute(
        "INSERT INTO users_projects (user_id, project_id) VALUES (?, ?)",
        (payload.user_id, payload.project_id),
    )
    db.commit()

    user_project_id = cursor.lastrowid

    cursor = db.execute(
        "SELECT id, user_id, project_id FROM users_projects WHERE id = ?",
        (user_project_id,),
    )
    columns = [col[0] for col in cursor.description]
    row = cursor.fetchone()

    return UserProject.model_validate(dict(zip(columns, row)))


@router.get("/", response_model=list[UserProject])
async def user_projects(db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT id, user_id, project_id FROM users_projects;")
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()

    return [UserProject.model_validate(dict(zip(columns, row))) for row in rows]
