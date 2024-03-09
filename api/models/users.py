"""
Pydantic Models for Users.
"""

from typing import Optional
from pydantic import BaseModel, PositiveInt


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
