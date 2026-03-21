from sqlalchemy import select
from sqlalchemy.orm import Session
from features.projects.models import Project as ProjectModel
from infrastructure.databases.orm import Project

def create_project(db: Session, name: str) -> ProjectModel:
    new_project = Project(name=name)
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return ProjectModel.model_validate(new_project)

def get_projects(db: Session) -> list[ProjectModel]:
    rows = db.scalars(select(Project)).all()
    return [ProjectModel.model_validate(row) for row in rows]
