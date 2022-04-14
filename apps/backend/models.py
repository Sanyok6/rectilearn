from datetime import datetime

from sqlalchemy import Boolean, Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, autoincrement=True, primary_key=True)
    email = Column(String, unique=True, primary_key=True)
    name = Column(String, unique=True)
    hashed_password = Column(String)
    role = Column(String, default="user")  # admin/user
    created_at = Column(DateTime(), default=datetime.utcnow())
    study_sets = relationship("StudySets")


class StudySets(Base):
    __tablename__ = "study_sets"
    id = Column(Integer, autoincrement=True, primary_key=True)
    creator = Column(Integer, ForeignKey("users.id"))
    question = Column(String(4096))
    answer = Column(String(4096))
    created_at = Column(DateTime(), default=datetime.utcnow())
