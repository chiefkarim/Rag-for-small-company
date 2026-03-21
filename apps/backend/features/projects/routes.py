from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from features.projects.dto import CreateProject
from deps import get_db
from features.projects.models import Project
from features.projects import repository as projects_repo

router = APIRouter(prefix="/projects")


@router.post(
    "/",
)
async def create_project(
    payload: CreateProject, db: Session = Depends(get_db)
):
    return projects_repo.create_project(db, payload.name)


@router.get("/", response_model=list[Project])
async def projects(db: Session = Depends(get_db)):
    return projects_repo.get_projects(db)
