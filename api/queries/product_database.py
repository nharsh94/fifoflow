from typing import List, Optional, Union
from queries.pool import pool
from models.products import ProductIn, ProductOut, Error


class ProductRepository:

    def get_one(self, products_id: int) -> Optional[ProductOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT product_id
                            , name
                            , description
                            , price
                            , quantity_in_stock
                            , category
                            , alert_threshold
                            , stock_alert
                            , shop_name
                        FROM products
                        WHERE product_id = %s
                        """,
                        [products_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_product_out(record)
        except Exception:
            return {"message": "Could not get that product"}

    def delete(self, products_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM products
                        WHERE product_id = %s
                        """,
                        [products_id],
                    )
                    return True
        except Exception:
            return False

    def update(
        self, products_id: int, product: ProductIn
    ) -> Union[List[ProductOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE products
                        SET name = %s
                            , description = %s
                            , price = %s
                            , quantity_in_stock = %s
                            , category = %s
                            , alert_threshold = %s
                            , stock_alert = %s
                            , shop_name = %s
                        WHERE product_id = %s
                        """,
                        [
                            product.name,
                            product.description,
                            product.price,
                            product.quantity_in_stock,
                            product.category,
                            product.alert_threshold,
                            product.stock_alert,
                            product.shop_name,
                            products_id,
                        ],
                    )
                    return self.product_in_to_out(products_id, product)
        except Exception:
            return {"message": "Could not update product"}

    def get_all(self) -> Union[Error, List[ProductOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT product_id
                             , name
                             , description
                             , price
                             , quantity_in_stock
                             , category
                             , alert_threshold
                             , stock_alert
                             , shop_name
                        FROM products
                        ORDER BY product_id
                        """
                    )
                    result = []
                    for record in db:
                        product = ProductOut(
                            product_id=record[0],
                            name=record[1],
                            description=record[2],
                            price=record[3],
                            quantity_in_stock=record[4],
                            category=record[5],
                            alert_threshold=record[6],
                            stock_alert=record[7],
                            shop_name=record[8],
                        )
                        result.append(product)
                    return result
        except Exception:
            return {"message": "Could not get all products"}

    def create(self, product: ProductIn) -> ProductOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO products (
                            name,
                            description,
                            price,
                            quantity_in_stock,
                            category,
                            alert_threshold,
                            stock_alert,
                            shop_name
                        )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING product_id;
                        """,
                        [
                            product.name,
                            product.description,
                            product.price,
                            product.quantity_in_stock,
                            product.category,
                            product.alert_threshold,
                            product.stock_alert,
                            product.shop_name,
                        ],
                    )
                    product_id = result.fetchone()[0]
                    return self.product_in_to_out(product_id, product)
        except Exception:
            return {"message": "Could not create product"}

    def product_in_to_out(self, product_id: int, product: ProductIn):
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
            alert_threshold=record[6],
            stock_alert=record[7],
            shop_name=record[8],
        )

    def set_stock_alert(self, products_id: int, value: bool) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE products
                        SET stock_alert = %s
                        WHERE product_id = %s
                        """,
                        [value, products_id],
                    )
                    return True
        except Exception:
            return False

    def get_stock_alert(self, products_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT stock_alert
                        FROM products
                        WHERE product_id = %s
                        """,
                        [products_id],
                    )
                    return result.fetchone()[0]
        except Exception:
            return False
