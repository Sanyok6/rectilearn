import typing
from datetime import datetime

from fastapi import HTTPException
from pydantic import BaseModel, validator


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

    @validator("question")
    def validate_question(cls, value):
        value = str(value)

        if len(value) <= 3:
            raise HTTPException(status_code=422, detail="Question must be at least 4 characters long.")

        return value

    @validator("answers")
    def validate_answers(cls, value):
        if not value:
            raise HTTPException(status_code=422, detail="Answers cannot be empty")

        elif len(value) > 7:
            raise HTTPException(status_code=422, detail="There cannot be more than 7 answers for a question")

        for answer in value:
            if len(str(answer)) <= 0:
                raise HTTPException(status_code=422, detail="Answers must be at least 4 characters long.")

        return value

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

    @validator("subject")
    def validate_subject(cls, value):
        value = str(value)

        if len(value) <= 1:
            raise HTTPException(status_code=422, detail="Subject must be at least 2 characters long.")

        return value
    class Config:
        orm_mode = True


class StudySet(StudySetCreate):
    id: int
    creator: int
    created_at: datetime
    questions: typing.List[StudySetQuestions]

    class Config:
        orm_mode = True
