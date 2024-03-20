"""
Pydantic Models for Users.
"""

from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel


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

    def model_dump(self):
        return {
            "id": self.id,
            "username": self.username,
        }


class UserToken(Token):
    user: UserResponse
