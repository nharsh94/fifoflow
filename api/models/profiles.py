from pydantic import BaseModel


class Error(BaseModel):
    message: str


class ProfileIn(BaseModel):
    user_id: int
    role_id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    password: str


class ProfileOut(BaseModel):
    id: int
    user_id: int
    role_id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    password: str
