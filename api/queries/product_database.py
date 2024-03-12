from typing import List, Optional
from queries.pool import pool
from models.products import ProductIn, ProductOut, Error
import traceback


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
                    return self.product_in_to_out(product_id, product)
        except Exception:
            traceback.print_exc()
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
        except Exception as e:
            logging.error(f"Could not get all products: {e}")
            return []

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
                            product.supplier_id,
                            product.alert_threshold,
                        ],
                    )
                    product_id = result.fetchone()[0]
                    return self.product_in_to_out(product_id, product)
        except Exception as e:
            logging.error(f"Error creating product: {e}")
            return None

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
            user_id=record[6],
            alert_threshold=record[7],
        )
