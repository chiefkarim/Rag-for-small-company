from fastapi import APIRouter, Depends
import sqlite3
from deps import get_db
from .users_dto import CreateUserProject
from models.user import UserProject
from repositories import users_projects as users_projects_repo

router = APIRouter(prefix="/users-projects")


@router.post("/", response_model=UserProject)
async def create_user_project(
    payload: CreateUserProject, db: sqlite3.Connection = Depends(get_db)
):
    return users_projects_repo.create_user_project(db, payload.user_id, payload.project_id)


@router.get("/", response_model=list[UserProject])
async def user_projects(db: sqlite3.Connection = Depends(get_db)):
    return users_projects_repo.get_user_projects(db)
