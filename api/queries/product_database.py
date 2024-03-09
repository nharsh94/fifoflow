from typing import List, Optional, Union
from queries.pool import pool
import models.products as pro
import logging

logging.basicConfig(level=logging.INFO)


class ProductRepository:

    def get_one(self, product_id: int) -> Optional[pro.ProductOut]:
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
                        logging.error(
                            f"Product with ID {product_id} was not found"
                        )
                        return None
                    return self.record_to_product_out(record)
        except Exception as e:
            logging.error(f"Could not get product: {e}")
            return None

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
        except Exception as e:
            logging.error(f"Error deleting product with ID {product_id}: {e}")
            return False

    def update(
        self, product_id: int, product: pro.ProductIn
    ) -> Optional[pro.ProductOut]:
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
                            user_id = %s,
                            alert_threshold = %s
                        WHERE product_id = %s
                        RETURNING *
                        """,
                        [
                            product.name,
                            product.description,
                            product.price,
                            product.quantity_in_stock,
                            product.category,
                            product.user_id,
                            product.alert_threshold,
                            product_id,
                        ],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return self.record_to_product_out(record)
        except Exception as e:
            logging.error(
                f"Could not update product with ID {product_id}: {e}"
            )
            return None

    def get_all(self) -> List[pro.ProductOut]:
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
        except Exception as e:
            logging.error(f"Could not get all products: {e}")
            return []

    def create(self, product: pro.ProductIn) -> Optional[pro.ProductOut]:
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
                            user_id, 
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
                            product.user_id,
                            product.alert_threshold,
                        ],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return self.record_to_product_out(record)
        except Exception as e:
            logging.error(f"Error creating product: {e}")
            return None

    def product_in_to_out(self, product_id: int, product: pro.ProductOut):
        old_data = product.dict()
        return product.ProductOut(product_id=product_id, **old_data)

    def record_to_product_out(self, record):
        return pro.ProductOut(
            id=record[0],
            name=record[1],
            description=record[2],
            price=record[3],
            quantity_in_stock=record[4],
            category=record[5],
            user_id=record[6],
            alert_threshold=record[7],
        )
