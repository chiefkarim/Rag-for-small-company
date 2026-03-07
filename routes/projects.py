from fastapi import APIRouter
from fastapi import Depends
import sqlite3
from projects.write import CreateProject
from main_dependencies import get_db
from projects.read import Project

router = APIRouter(prefix="/projects")


@router.post(
    "/",
)
async def create_project(
    payload: CreateProject, db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.execute("INSERT INTO projects (name) VALUES (?)", (payload.name,))
    db.commit()

    user_id = cursor.lastrowid

    cursor = db.execute(
        "SELECT id, name, created_at FROM projects WHERE id = ?", (user_id,)
    )
    columns = [col[0] for col in cursor.description]
    row = cursor.fetchone()

    return Project.model_validate(dict(zip(columns, row)))


@router.get("/", response_model=list[Project])
async def projects(db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT * FROM projects;")
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()

    return [Project.model_validate(dict(zip(columns, row))) for row in rows]
