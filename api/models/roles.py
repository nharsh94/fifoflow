from pydantic import BaseModel


class Error(BaseModel):
    message: str


class RoleIn(BaseModel):
    role_name: str


class RoleOut(BaseModel):
    role_id: int
    role_name: str
