from pydantic import BaseModel
from decimal import Decimal
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message : str

class ProductIn(BaseModel):
    name : str
    description : str
    price : Decimal
    quantity_in_stock: int
    category : str
    supplier_id : int
    alert_threshold : int


class ProductOut(BaseModel):
    id : int
    name : str
    description : str
    price : Decimal
    quantity_in_stock: int
    category : str
    supplier_id : int
    alert_threshold : int

class ProductRepository:
    def create(self, product: ProductIn) -> ProductOut:
        with pool.connection() as conn:
            with conn.cursor() as db:
               result = db.execute(
                    """
                    INSERT INTO products
                    (name, description, price, quantitiy_in_stock, category, supplier_id, alert_threshold)
                    VALUES
                    (%s, %s, %s, %s, %s, %s,%s)
                    RETURNING id;
                    """,
                    [
                        product.name,
                        product.description,
                        product.price,
                        product.quantity_in_stock,
                        product.category,
                        product.supplier_id,
                        product.alert_threshold
                    ]
                )
               id = result.fetchone()[0]
               old_data = product.dict()
               return ProductOut(id = id, **old_data)
