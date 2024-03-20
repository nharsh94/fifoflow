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
