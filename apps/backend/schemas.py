import typing
from datetime import datetime

from fastapi import HTTPException
from pydantic import BaseModel, validator, Field

from settings import PROFILE_PICTURE_INDEXES


class HighScores(BaseModel):
    id: int
    user: int
    fishillionare_highscore: int
    foodfight_highscore: int
    dogeball_highscore: int
    thefloorislava_highscore: int

    def _validate_score(cls, score):
        if score > 9_223_372_036_854_000_000:
            raise HTTPException(status_code=422, detail="Score cannot be more than 9 223 372 036 854 000 000")

        return score

    validate_fishillionare_highscore = validator("fishillionare_highscore", allow_reuse=True)(_validate_score)
    validate_foodfight_highscore = validator("foodfight_highscore", allow_reuse=True)(_validate_score)
    validate_dogeball_highscore = validator("dogeball_highscore", allow_reuse=True)(_validate_score)
    validate_thefloorislava_highscore = validator("thefloorislava_highscore", allow_reuse=True)(_validate_score)

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    email: str
    name: str

    class Config:
        orm_mode = True


class User(UserBase):
    id: int
    role: typing.Optional[str] = None
    high_scores: HighScores
    profile_picture_index: int

    @validator("profile_picture_index")
    def validate_profile_picture_index(cls, profile_picture_index):
        if profile_picture_index not in PROFILE_PICTURE_INDEXES:
            raise HTTPException(status_code=422, detail=f"profile_picture_index only can be the following: {PROFILE_PICTURE_INDEXES}")

        return profile_picture_index


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
                raise HTTPException(status_code=422, detail="Answers must be at least 1 characters long.")

        return value

    class Config:
        orm_mode = True


class StudySetQuestions(StudySetQuestionCreate):
    id: int
    correct_count: typing.Optional[int]
    wrong_count: typing.Optional[int]

    def validate_count(cls, count):
        return count or 0

    validate_correct_count = validator('correct_count', allow_reuse=True)(validate_count)
    validate_wrong_count = validator('wrong_count', allow_reuse=True)(validate_count)

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


class QuestionAccuracy(BaseModel):
    question_id: int
    is_correct: bool
