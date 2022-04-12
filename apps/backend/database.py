import sqlalchemy
import pg8000
import settings
from google.cloud.sql.connector import Connector

from sqlalchemy.ext.declarative import declarative_base


if settings.PRODUCTION:
    def init_connection_engine() -> sqlalchemy.engine.Engine:
        def getconn() -> pg8000.dbapi.Connection:
            connector = Connector()
            conn: pg8000.dbapi.Connection = connector.connect(
                settings.POSTGRES_CONNECTION_NAME,
                "pg8000",
                user=settings.POSTGRES_USER,
                password=settings.POSTGRES_PASS,
                db=settings.POSTGRES_DB,
            )
            return conn

        engine = sqlalchemy.create_engine(
            "postgresql+pg8000://",
            creator=getconn,
        )
        engine.dialect.description_encoding = None
        return engine

    engine = init_connection_engine()
    Base = declarative_base()

else:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
    # SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"
    engine = sqlalchemy.create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    Base = declarative_base()
