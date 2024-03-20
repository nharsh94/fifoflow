"""
Pydantic Models for Users.
"""

from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel


class UserRequest(BaseModel):

    username: str
    password: str


class UserResponse(BaseModel):

    id: int
    username: str


class UserWithPw(BaseModel):

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
