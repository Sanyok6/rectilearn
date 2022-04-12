import sqlalchemy
import schemas
import database
import models
from fastapi import HTTPException, status
from sqlalchemy.orm import Session


def get_user(email: str):
    with Session(database.engine) as session:
        return session.query(models.User).filter(models.User.email == email).first()


def create_user(user: schemas.UserCreate):

    db_user = models.User(
        name=user.name,
        email=user.email,
        hashed_password=user.password,
        role=user.role,
    )
    try:
        with Session(database.engine) as session:
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return db_user
    except sqlalchemy.exc.IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with that email already exists",
        )