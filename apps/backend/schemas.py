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


class StudySetQuestionCreate(BaseModel):
    question: str
    answers: typing.List[str]

    class Config:
        orm_mode = True


class StudySetQuestions(StudySetQuestionCreate):
    id: int

    class Config:
        orm_mode = True


class StudySetCreate(BaseModel):
    subject: str
    questions: typing.Optional[typing.List[StudySetQuestionCreate]] = None
    is_public: typing.Optional[bool]=None
    class Config:
        orm_mode = True


class StudySet(StudySetCreate):
    id: int
    creator: int
    created_at: datetime
    questions: typing.List[StudySetQuestions]

    class Config:
        orm_mode = True
