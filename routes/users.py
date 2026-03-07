from fastapi import APIRouter
from fastapi import Depends
import sqlite3
from deps import get_db
from .users_dto import CreateUser
from models.user import User

router = APIRouter(prefix="/users")


@router.get("/", response_model=list[User])
async def users(db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT * FROM users;")
    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    return [User.model_validate(dict(zip(columns, row))) for row in rows]


@router.post("/", response_model=User)
async def create_user(payload: CreateUser, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("INSERT INTO users (name) VALUES (?)", (payload.name,))
    db.commit()

    user_id = cursor.lastrowid

    cursor = db.execute(
        "SELECT id, name, created_at FROM users WHERE id = ?", (user_id,)
    )
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()

    return [User.model_validate(dict(zip(columns, row))) for row in rows]
