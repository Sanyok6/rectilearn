from datetime import datetime

from sqlalchemy import ARRAY, Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    email = Column(String, unique=True, primary_key=True)
    name = Column(String)
    hashed_password = Column(String)
    role = Column(String, default="user")  # admin/user
    created_at = Column(DateTime(), default=datetime.utcnow())
    study_sets = relationship("StudySets")


class StudySets(Base):
    __tablename__ = "study_sets"
    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    subject = Column(String(255))
    creator = Column(Integer, ForeignKey("users.id"))
    questions = relationship("StudySetQuestions", lazy="subquery")
    created_at = Column(DateTime(), default=datetime.utcnow())
    is_public = Column(Boolean, default=False)

class StudySetQuestions(Base):
    __tablename__ = "studyset_questions"
    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    study_set = Column(Integer, ForeignKey("study_sets.id"))
    question = Column(String(4096))
    answers = Column(ARRAY(String(1000)))
