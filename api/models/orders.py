from pydantic import BaseModel, Field
from datetime import datetime
from decimal import Decimal


class Error(BaseModel):
    message: str


class OrdersIn(BaseModel):
    shop_id: int
    user_id: int
    product_id: int
    quantity: int
    total_price: Decimal
    status: str
    order_date: datetime = Field(default_factory=datetime.now)


class OrdersOut(BaseModel):
    order_id: int
    shop_id: int
    user_id: int
    order_date: datetime
    product_id: int
    quantity: int
    total_price: Decimal
    status: str


class OrderItemsIn(BaseModel):
    shop_id: int
    order_id: int
    product_id: int
    quantity: int
    unit_price: Decimal
    total_price: Decimal
    status: str


class OrderItemsOut(BaseModel):
    id: int
    shop_id: int
    order_id: int
    product_id: int
    quantity: int
    unit_price: Decimal
    total_price: Decimal
    status: str
