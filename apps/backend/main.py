import psycopg2
import random
import typing
from datetime import datetime, timedelta
from http import HTTPStatus
from typing import Optional

import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.models import OAuthFlows as OAuthFlowsModel
from fastapi.security import OAuth2PasswordRequestForm, OAuth2
from fastapi.security.utils import get_authorization_scheme_param
from jose import JWTError, jwt
from passlib.context import CryptContext
from starlette.requests import Request

import crud
import models
import schemas
from settings import *

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class OAuth2PasswordBearerCookie(OAuth2):
    def __init__(
            self,
            tokenUrl: str,
            scheme_name: str = None,
            scopes: dict = None,
            auto_error: bool = True,
    ):
        if not scopes:
            scopes = {}
        flows = OAuthFlowsModel(password={"tokenUrl": tokenUrl, "scopes": scopes})
        super().__init__(flows=flows, scheme_name=scheme_name, auto_error=auto_error)

    async def __call__(self, request: Request) -> Optional[str]:
        header_authorization: str = request.headers.get("Authorization")
        cookie_authorization: str = request.cookies.get("Authorization")

        header_scheme, header_param = get_authorization_scheme_param(
            header_authorization
        )
        cookie_scheme, cookie_param = get_authorization_scheme_param(
            cookie_authorization
        )
        if header_scheme.lower() == "bearer":
            authorization = True
            scheme = header_scheme
            param = header_param

        elif cookie_scheme.lower() == "bearer":
            authorization = True
            scheme = cookie_scheme
            param = cookie_param

        else:
            authorization = False

        if not authorization or scheme.lower() != "bearer":
            if self.auto_error:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN, detail="Not authenticated"
                )
            else:
                return None
        return param


oauth2_scheme = OAuth2PasswordBearerCookie(tokenUrl="auth/token/")

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
async def index():
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
    access_token_expires = timedelta(weeks=ACCESS_TOKEN_EXPIRE_WEEKS)
    # Store the username and email in the access token, so we can use it later
    access_token = create_access_token(
        data={"email": user.email},
        expires_delta=access_token_expires,
    )
    print(access_token_expires.total_seconds())
    response.set_cookie(
        "Authorization",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=True,
        max_age=access_token_expires.total_seconds(),
        expires=access_token_expires.total_seconds(),
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/users/me/", response_model=schemas.User)
async def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user


@app.post("/auth/users/create/", response_model=schemas.User)
def create_user(user: schemas.UserCreate):
    user.password = get_password_hash(user.password)
    user = crud.create_user(user)
    print(user.high_scores)
    print(user.profile_picture_index)
    return user


@app.post("/studysets/new/", response_model=schemas.StudySet)
def create_study_set(
        study_set: schemas.StudySetCreate, user: schemas.User = Depends(get_current_user)
):
    v = crud.create_study_set(study_set, user.id)
    return v


@app.get("/studysets/", response_model=typing.List[schemas.StudySet])
def get_study_set(user: schemas.User = Depends(get_current_user)):
    return crud.get_study_sets(user.id)


@app.post(
    "/studysets/{study_set_id}/add_question/", response_model=schemas.StudySetQuestions
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


@app.put(
    "/studysets/{study_set_id}/update/", response_model=schemas.StudySet
)
def update_studyset(
        study_set_id: int,
        new_study_set: schemas.StudySetCreate,
        user: schemas.User = Depends(get_current_user),
):
    study_set = crud.get_study_set(study_set_id)
    if study_set.creator != user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authorized to add question to this study set",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return crud.update_study_set(study_set_id, new_study_set)
    # return stu


@app.delete("/studysets/{study_set_id}/delete_question/")
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


@app.delete("/studysets/{study_set_id}/delete_study_set/")
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


@app.get("/studysets/public/", response_model=typing.List[schemas.StudySet])
def get_public_study_sets():
    sets = crud.get_public_study_sets()
    if len(sets) == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No study sets",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return sets


@app.get("/studysets/{study_set_id}/", response_model=schemas.StudySet)
def get_study_set_by_id(study_set_id: int, user: schemas.User = Depends(get_current_user)):
    set = crud.get_study_set(study_set_id)
    if set == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No study set found with this id",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if set.is_public == False:
        if set.creator != user.id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authorized to view this study set",
                headers={"WWW-Authenticate": "Bearer"},
            )
    return set


@app.get("/studysets/questions/random/", response_model=schemas.StudySetQuestions)
def get_random_question(user: schemas.User = Depends(get_current_user)):
    sets = crud.get_public_study_sets()
    if len(sets) == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No study sets",
            headers={"WWW-Authenticate": "Bearer"},
        )

    set = random.choice(sets)
    questions = crud.get_questions(set.id)
    question = random.choice(questions)

    return question


@app.post("/logout/")
def logout(response: Response):
    response.delete_cookie(key="Authorization")
    return {"message": "Successfully logged out"}


@app.post("/set-high-score/{game_mode}/{new_high_score}/", response_model=schemas.User)
def set_high_score(game_mode: str, new_high_score: int, user: schemas.User = Depends(get_current_user)):
    return crud.update_high_score(user.id, game_mode, new_high_score)


@app.post("/set-profile-picture/{profile_picture_index}/", response_model=schemas.User)
def set_profile_picture(profile_picture_index: int, user: schemas.User = Depends(get_current_user)):
    return crud.set_profile_picture_index(user.id, profile_picture_index)


@app.post("/studysets/update-question-accuracy/{studyset_id}/", response_model=schemas.StudySet)
def update_question_accuracy(studyset_id: int, question_accuracies: typing.List[schemas.QuestionAccuracy],
                             user: schemas.User = Depends(get_current_user)):
    return crud.update_questions_accuracy(studyset_id, user, question_accuracies)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", default=8000)),
        log_level="info",
    )
