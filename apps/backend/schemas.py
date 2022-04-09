import email
import typing
from pydantic import BaseModel


class User(BaseModel):
    email: str
    name: str
    role: typing.Optional[str] = None

    class Config:
        orm_mode = True


class TokenData(BaseModel):
    access_token: str
    token_type: str


class UserCreate(User):
    password: str

    class Config:
        orm_mode = True
