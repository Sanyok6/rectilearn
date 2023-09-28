from datetime import datetime

from sqlalchemy import ARRAY, BigInteger, Column, Integer, String, DateTime, ForeignKey, Boolean
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
    high_scores = relationship("HightScores", uselist=False, backref="parent", lazy="subquery")
    profile_picture_index = Column(Integer, default=0)


class HightScores(Base):
    __tablename__ = "high_scores"
    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    user = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    fishillionare_highscore = Column(BigInteger, default=0)
    foodfight_highscore = Column(BigInteger, default=0)
    dogeball_highscore = Column(BigInteger, default=0)
    thefloorislava_highscore = Column(BigInteger, default=0)


class StudySets(Base):
    __tablename__ = "study_sets"
    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    subject = Column(String(255))
    creator = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    questions = relationship("StudySetQuestions", lazy="subquery")
    created_at = Column(DateTime(), default=datetime.utcnow())
    is_public = Column(Boolean, default=False)


class StudySetQuestions(Base):
    __tablename__ = "studyset_questions"
    id = Column(Integer, autoincrement=True, primary_key=True, unique=True)
    study_set = Column(Integer, ForeignKey("study_sets.id", ondelete="CASCADE"))
    question = Column(String(4096))
    answers = Column(ARRAY(String(1000)))
    correct_count = Column(Integer(), default=0)
    wrong_count = Column(Integer(), default=0)
