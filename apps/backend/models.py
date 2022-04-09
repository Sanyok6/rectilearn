from sqlalchemy import Boolean, Column, Integer, String, DateTime


from database import Base


class User(Base):
    __tablename__ = "users"
    email = Column(String, unique=True, primary_key=True)
    name = Column(String)
    hashed_password = Column(String)
    role = Column(String, default="user")  # admin/user
