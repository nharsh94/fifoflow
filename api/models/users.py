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
    customer_id: Optional[PositiveInt] = None
    # Optional field, assuming not all users might have this
    employee_id: Optional[PositiveInt] = None
    # Optional field, assuming not all users might have this
    supplier_id: Optional[PositiveInt] = None
    # Optional field, assuming not all users might have this


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
    customer_id: Optional[PositiveInt] = None
    # Optional field, assuming not all users might have this
    employee_id: Optional[PositiveInt] = None
    # Optional field, assuming not all users might have this
    supplier_id: Optional[PositiveInt] = None
    # Optional field, assuming not all users might have this
