from pydantic import BaseModel


class UserData(BaseModel):
    user_id: int
    username: str
    role: str
    first_name: str
    last_name: str
    email: str
    phone: str
