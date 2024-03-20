from pydantic import BaseModel


class Error(BaseModel):

    message: str


class ShopIn(BaseModel):

    shop_name: str
    address: str
    phone: str


class ShopOut(BaseModel):

    shop_id: int
    shop_name: str
    address: str
    phone: str
