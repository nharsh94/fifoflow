from typing import List, Optional, Union
from queries.pool import pool
from models.products import ProductIn, ProductOut, Error


class ProductRepository:

    def get_one(self, product_id: int) -> Optional[ProductOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM products
                        WHERE product_id = %s
                        """,
                        [product_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return self.record_to_product_out(record)
        except Exception:
            return {"message": "Product ID does not exist"}

    def delete(self, product_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM products
                        WHERE product_id = %s
                        """,
                        [product_id],
                    )
                    return True
        except Exception:
            return False

    def update(
        self, product_id: int, product: ProductIn
    ) -> Union[List[ProductOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE products
                        SET name = %s,
                            description = %s,
                            price = %s,
                            quantity_in_stock = %s,
                            category = %s,
                            supplier_id = %s,
                            alert_threshold = %s,
                            deleted_flag = %s
                        WHERE product_id = %s
                        RETURNING *
                        """,
                        [
                            product.name,
                            product.description,
                            product.price,
                            product.quantity_in_stock,
                            product.category,
                            product.supplier_id,
                            product.alert_threshold,
                            product.deleted_flag,
                            product_id,
                        ],
                    )
                    return self.product_in_to_out(product_id, product)
        except Exception:
            return {"message": "Could not update product"}

    def get_all(self) -> Union[List[ProductOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM products
                        ORDER BY product_id
                        """
                    )
                    records = db.fetchall()
                    return [
                        self.record_to_product_out(record)
                        for record in records
                    ]
        except Exception:
            return {"message": "Failed to get all orders"}

    def create(self, product: ProductIn) -> ProductOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO products (
                            name,
                            description,
                            price,
                            quantity_in_stock,
                            category,
                            supplier_id,
                            alert_threshold
                        )
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING *
                        """,
                        [
                            product.name,
                            product.description,
                            product.price,
                            product.quantity_in_stock,
                            product.category,
                            product.supplier_id,
                            product.alert_threshold,
                        ],
                    )
                    product_id = db.fetchone()[0]
                    return self.product_in_to_out(product_id, product)
        except Exception:
            return {"message": "Product faild to create"}

    def product_in_to_out(self, product_id: int, product: ProductOut):
        old_data = product.dict()
        return ProductOut(product_id=product_id, **old_data)

    def record_to_product_out(self, record):
        return ProductOut(
            product_id=record[0],
            name=record[1],
            description=record[2],
            price=record[3],
            quantity_in_stock=record[4],
            category=record[5],
            supplier_id=record[6],
            alert_threshold=record[7],
            deleted_flag=record[8],
        )
