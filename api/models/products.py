from pydantic import BaseModel
from decimal import Decimal


class Error(BaseModel):
    message: str


class ProductIn(BaseModel):
    name: str
    description: str
    price: Decimal
    quantity_in_stock: int
    category: str
    supplier_id: int
    alert_threshold: int


class ProductOut(BaseModel):
    product_id: int
    name: str
    description: str
    price: Decimal
    quantity_in_stock: int
    category: str
    supplier_id: int
    alert_threshold: int
