from fastapi import APIRouter
from fastapi import Depends
import sqlite3
from deps import get_db
from .users_dto import CreateUser
from models.user import User
from repositories import users as users_repo

router = APIRouter(prefix="/users")


@router.get("/", response_model=list[User])
async def users(db: sqlite3.Connection = Depends(get_db)):
    return users_repo.get_users(db)


@router.post("/", response_model=User)
async def create_user(payload: CreateUser, db: sqlite3.Connection = Depends(get_db)):
    return users_repo.create_user(db, payload.name)
