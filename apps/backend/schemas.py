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


class BaseStudySet(BaseModel):
    creator: int
    question: str
    answer: str


class StudySet(BaseStudySet):
    id: int
    created_at: datetime
