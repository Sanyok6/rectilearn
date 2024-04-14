import sqlalchemy
import settings

from sqlalchemy.ext.declarative import declarative_base


if settings.PRODUCTION or settings.USE_LOCAL_PG:
    engine = sqlalchemy.create_engine(
     f"{'cockroachdb+psycopg2' if not settings.USE_LOCAL_PG else ''}" + settings.POSTGRESQL_URI
    )

    Base = declarative_base()

else:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"
    # SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"
    engine = sqlalchemy.create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
    Base = declarative_base()
