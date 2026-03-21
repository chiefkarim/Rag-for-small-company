from infrastructure.config import get_settings
import libsql

settings = get_settings()


class DatabaseConfig:

    def __init__(self, read_only: bool = False) -> None:

        self._db_auth_token = settings.DATABASE_READ_AUTH_TOKEN if read_only else settings.DATABASE_WRITE_AUTH_TOKEN
        self._db_url = settings.DATABASE_URL

        if self._db_auth_token is None:
            raise ValueError(
                "DATABASE_READ_AUTH_TOKEN or DATABASE_WRITE_AUTH_TOKEN is None"
            )

        if self._db_url is None:
            raise ValueError("DATABASE_URL is None")

        print(f"DEBUG: Connecting to local DB at: {settings.DATABASE_LOCAL_PATH}")
        print(f"DEBUG: Syncing with URL: {self._db_url}")

        # Ensure the directory for the local DB exists
        import os
        db_dir = os.path.dirname(os.path.abspath(settings.DATABASE_LOCAL_PATH))
        if not os.path.exists(db_dir):
            print(f"DEBUG: Creating directory {db_dir}")
            os.makedirs(db_dir, exist_ok=True)

        self.client = libsql.connect(  # type: ignore
            database=settings.DATABASE_LOCAL_PATH,
            sync_url=self._db_url,
            auth_token=self._db_auth_token,
            sync_interval=5,
        )
        self.client.sync()
