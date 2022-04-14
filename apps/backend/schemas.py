import typing
from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str

    class Config:
        orm_mode = True


class User(UserBase):
    id: int
    role: typing.Optional[str] = None

    class Config:
        orm_mode = True


class TokenData(BaseModel):
    access_token: str
    token_type: str


class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True


class StudySetQuestions(BaseModel):
    id: int
    question: str
    answers: typing.List[str]

    class Config:
        orm_mode = True


class StudySetCreate(BaseModel):
    creator: int
    questions: typing.List[StudySetQuestions]

    class Config:
        orm_mode = True


class StudySet(StudySetCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
