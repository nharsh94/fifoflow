"""
Pydantic Models for Shops.
"""

from pydantic import BaseModel


class Error(BaseModel):
    """
    Represents error message.
    """
    message: str


class ShopIn(BaseModel):
    """
    Represents a the parameters needed to create a new shop.
    """
    shop_name: str
    address: str
    phone: str


class ShopOut(BaseModel):
    """
    Represents a the parameters returned when fetching shop info.
    """
    shop_id: int
    shop_name: str
    address: str
    phone: str
