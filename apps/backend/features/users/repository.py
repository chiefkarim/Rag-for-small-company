from sqlalchemy import select
from sqlalchemy.orm import Session
from features.users.models import User as UserModel, UserInDB
from infrastructure.databases.orm import User

def get_user_by_email(db: Session, email: str) -> UserInDB | None:
    row = db.scalars(select(User).filter(User.email == email)).first()
    if row is None:
        return None
    return UserInDB.model_validate(row)

def get_users(db: Session) -> list[UserModel]:
    rows = db.scalars(select(User)).all()
    return [UserModel.model_validate(row) for row in rows]

def create_user(db: Session, name: str, email: str, role: str, hashed_password: str) -> UserModel:
    new_user = User(name=name, email=email, role=role, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return UserModel.model_validate(new_user)
