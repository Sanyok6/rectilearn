from textwrap import indent
import sqlalchemy
from apps.backend.settings import PROFILE_PICTURE_INDEXES
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


def update_study_set(study_set_id: int, study_set: schemas.StudySetCreate):
    with Session(database.engine) as session:
        db_study_set = session.query(models.StudySets).filter(models.StudySets.id == study_set_id).first()
        db_study_set.subject = study_set.subject
        db_study_set.is_public = study_set.is_public

        session.query(models.StudySetQuestions).filter(models.StudySetQuestions.study_set == study_set_id).delete()
        session.commit()

        for question in study_set.questions:
            add_question(db_study_set.id, question)

        session.refresh(db_study_set)

        return db_study_set


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


def update_high_score(user: models.User, game_mode: str, new_high_score: int):
    full_gamemode = game_mode + "_highscore"
    if current_highscore := getattr(user.high_scores, full_gamemode):
        raise HTTPException("Invalid gamemode")

    if new_high_score <= current_highscore:
        raise HTTPException("New high score cannot be lower than previous high score")

    with Session(database.engine) as session:
            setattr(user.high_scores, game_mode + "_highscore")
            session.commit()
            session.refresh(user)

    return user


def set_profile_picture_index(user: models.User, new_index: int):
    if new_index not in PROFILE_PICTURE_INDEXES:
        raise HTTPException(status_code=422, detail=f"profile_picture_index only can be the following: {PROFILE_PICTURE_INDEXES}")
    
    with Session(database.engine) as session:
        user.profile_picture_index = new_index
        session.commit()
        session.refresh(user)

    return user
