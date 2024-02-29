"""
Pydantic Models for Users.
"""
from pydantic import BaseModel, EmailStr
from jwtdown_fastapi.authentication import Token

class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    username: str

class DBUser(User):
    id: int
    password_hash: str

class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str

class AccountToken(Token):
    user: UserResponse

class AuthenticationException(Exception):
    pass