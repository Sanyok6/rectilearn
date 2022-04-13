import typing
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str

    class Config:
        orm_mode = True


class User(UserBase):
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
