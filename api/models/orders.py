from pydantic import BaseModel
from datetime import datetime
from decimal import Decimal


class Error(BaseModel):
    message: str


class OrdersIn(BaseModel):
    shop_id: int
    employee_id: int
    customer_id: int
    order_date: datetime
    order_item: int
    product_id: int
    quantity: int
    total_price: Decimal


class OrdersOut(BaseModel):
    order_id: int
    shop_id: int
    employee_id: int
    customer_id: int
    order_date: datetime
    order_item: int
    product_id: int
    quantity: int
    total_price: Decimal


class OrderItemsIn(BaseModel):
    shop_id: int
    order_id: int
    product_id: int
    quantity: int
    unit_price: Decimal
    total_price: Decimal


class OrderItemsOut(BaseModel):
    order_items_id: int
    shop_id: int
    order_id: int
    product_id: int
    quantity: int
    unit_price: Decimal
    total_price: Decimal
