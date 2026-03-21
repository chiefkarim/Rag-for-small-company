from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from deps import get_db
from features.users.dto import CreateUserProject
from features.users.models import UserProject
from features.user_projects import repository as users_projects_repo

router = APIRouter(prefix="/users-projects")


@router.post("/", response_model=UserProject)
async def create_user_project(
    payload: CreateUserProject, db: Session = Depends(get_db)
):
    return users_projects_repo.create_user_project(db, payload.user_id, payload.project_id)


@router.get("/", response_model=list[UserProject])
async def user_projects(db: Session = Depends(get_db)):
    return users_projects_repo.get_user_projects(db)
