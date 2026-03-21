from sqlalchemy import select
from sqlalchemy.orm import Session
from features.users.models import UserProject as UserProjectModel
from infrastructure.databases.orm import UserProject

def create_user_project(db: Session, user_id: int, project_id: int) -> UserProjectModel:
    new_up = UserProject(user_id=user_id, project_id=project_id)
    db.add(new_up)
    db.commit()
    db.refresh(new_up)
    return UserProjectModel.model_validate(new_up)

def get_user_projects(db: Session) -> list[UserProjectModel]:
    rows = db.scalars(select(UserProject)).all()
    return [UserProjectModel.model_validate(row) for row in rows]
