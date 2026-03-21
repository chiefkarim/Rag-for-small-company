from infrastructure.config import get_settings
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

settings = get_settings()

engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class DatabaseConfig:
    def __init__(self, read_only: bool = False) -> None:
        self.engine = engine
        self.SessionLocal = SessionLocal
