import sqlite3
from models.user import User

def get_users(db: sqlite3.Connection) -> list[User]:
    cursor = db.execute("SELECT * FROM users;")
    rows = cursor.fetchall()
    columns = [col[0] for col in cursor.description]
    return [User.model_validate(dict(zip(columns, row))) for row in rows]

def create_user(db: sqlite3.Connection, name: str) -> list[User]:
    cursor = db.execute("INSERT INTO users (name) VALUES (?)", (name,))
    db.commit()

    user_id = cursor.lastrowid

    cursor = db.execute(
        "SELECT id, name, created_at FROM users WHERE id = ?", (user_id,)
    )
    columns = [col[0] for col in cursor.description]
    rows = cursor.fetchall()

    return [User.model_validate(dict(zip(columns, row))) for row in rows]
