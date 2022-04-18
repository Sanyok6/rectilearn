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
    )
    try:
        with Session(database.engine) as session:
            session.add(db_user)
            session.commit()
            session.refresh(db_user)
            return db_user
    except (sqlalchemy.exc.IntegrityError, sqlalchemy.exc.DatabaseError):
        # The pg8000 library will raise DatabaseError instead of IntegrityError
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User with that email already exists",
        )


def create_study_set(study_set: schemas.StudySetCreate, creator_id: int):
    db_study_set = models.StudySets(
        subject=study_set.subject,
        creator=creator_id,
        is_public=study_set.is_public
    )

    with Session(database.engine) as session:
        session.add(db_study_set)
        session.commit()

        if study_set.questions:
            for question in study_set.questions:
                add_question(db_study_set.id, question)

        session.refresh(db_study_set)
        return db_study_set


def get_study_sets(creator_id: int):
    with Session(database.engine) as session:
        return (
            session.query(models.StudySets)
            .filter(models.StudySets.creator == creator_id)
            .all()
        )


def get_study_set(study_set_id: int):
    with Session(database.engine) as session:
        return (
            session.query(models.StudySets)
            .filter(models.StudySets.id == study_set_id)
            .first()
        )


def add_question(study_set_id: int, question: schemas.StudySetQuestionCreate):
    db_question = models.StudySetQuestions(
        question=question.question,
        answers=question.answers,
        study_set=study_set_id,
    )
    with Session(database.engine) as session:
        session.add(db_question)
        session.commit()
        session.refresh(db_question)
        return db_question


def delete_question(question_id: int):
    with Session(database.engine) as session:
        session.query(models.StudySetQuestions).filter(
            models.StudySetQuestions.id == question_id
        ).delete()
        session.commit()
        return True

def get_questions(study_set_id: int):
    with Session(database.engine) as session:
        return (session.query(models.StudySetQuestions).filter(models.StudySetQuestions.study_set == study_set_id).all())

def get_question(question_id: int):
    with Session(database.engine) as session:
        return (
            session.query(models.StudySetQuestions)
            .filter(models.StudySetQuestions.id == question_id)
            .first()
        )


def delete_studyset(study_set_id: int):
    with Session(database.engine) as session:
        session.query(models.StudySets).filter(
            models.StudySets.id == study_set_id
        ).delete()
        session.commit()
        return True

def get_public_study_sets():
    with Session(database.engine) as session:
        return (
            session.query(models.StudySets)
            .filter(models.StudySets.is_public == True).filter(models.StudySets.questions!=None)
            .all()
        )
