<<<<<<< HEAD
"""
Pydantic Models for Users.
"""

=======
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
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
