from pydantic import BaseModel


class Error(BaseModel):
    message: str


class ProfileIn(BaseModel):
    user_id: int
    role: str
    first_name: str
    last_name: str
    email: str
    phone: str


class ProfileOut(BaseModel):
    id: int
    user_id: int
    role: str
    first_name: str
    last_name: str
    email: str
    phone: str
