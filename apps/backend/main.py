from datetime import datetime, timedelta
from http import HTTPStatus
import typing
import os
from typing import Optional
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session
import crud, models, schemas
from database import engine
from settings import *


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/token/")

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def authenticate_user(email: str, password: str):
    user = crud.get_user(email)

    if not user:
        return False

    if not verify_password(password, user.hashed_password):
        return False

    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("email")
        if email is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception
    user = crud.get_user(email=email)
    if user is None:
        raise credentials_exception
    return user


@app.get("/")
async def index(response: Response):
    response.set_cookie(
        key="test_val",
        value="test123"
    )
    return "Hello"


@app.post("/auth/token/", response_model=schemas.TokenData)
def login_for_access_token(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    # NOTE: The email is expected as the username
    user: typing.Union[models.User, bool] = authenticate_user(
        form_data.username, form_data.password
    )
    if user is False:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # Store the username and email in the access token, so we can use it later
    access_token = create_access_token(
        data={"email": user.email},
        expires_delta=access_token_expires,
    )
    response.set_cookie(key="access_token", value=access_token)
    # response.set_cookie(
    #     key="access_token",
    #     value=access_token,
    #     expires=int(access_token_expires.total_seconds()),
    #     httponly=True,
    #     secure=True,
    #     samesite=None
    # )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/users/me/", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user


@app.post("/auth/users/create/", response_model=schemas.User)
def create_user(user: schemas.UserCreate):
    user.password = get_password_hash(user.password)
    return crud.create_user(user)


@app.post("/studysets/new", response_model=schemas.StudySet)
def create_study_set(
    study_set: schemas.StudySetCreate, user: schemas.User = Depends(get_current_user)
):
    v = crud.create_study_set(study_set, user.id)
    return v


@app.get("/studysets", response_model=typing.List[schemas.StudySet])
def get_study_set(user: schemas.User = Depends(get_current_user)):
    return crud.get_study_sets(user.id)


@app.post(
    "/studysets/{study_set_id}/add_question", response_model=schemas.StudySetQuestions
)
def new_question(
    study_set_id: int,
    question: schemas.StudySetQuestionCreate,
    user: schemas.User = Depends(get_current_user),
):
    study_set = crud.get_study_set(study_set_id)
    if study_set.creator != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authorized to add question to this study set",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return crud.add_question(study_set_id, question)


@app.delete("/studysets/{study_set_id}/delete_question")
def delete_question(
    study_set_id: int,
    question_id: int,
    user: schemas.User = Depends(get_current_user),
):
    study_set = crud.get_study_set(study_set_id)
    if study_set.creator != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authorized to delete this study set",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if crud.get_question(question_id=question_id) is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No question found with this id",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if crud.get_question(question_id=question_id).study_set != study_set_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No question found for this study set",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if crud.delete_question(study_set_id):
        return HTTPStatus(status.HTTP_200_OK)


@app.delete("/studysets/{study_set_id}/delete_study_set")
def delete_study_set(
    study_set_id: int,
    user: schemas.User = Depends(get_current_user),
):
    study_set = crud.get_study_set(study_set_id)
    if study_set.creator != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authorized to delete this study set",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if crud.delete_studyset(study_set_id):
        return HTTPStatus(status.HTTP_200_OK)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", default=8000)),
        log_level="info",
    )
