from typing import List, Optional, Union
from queries.pool import pool
import models.products as pro


class ProductRepository:

    def get_one(self, product_id: int) -> Optional[pro.ProductOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM products
                        WHERE product_id = %s
                        """,
                        [product_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_product_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that product"}

    def delete(self, product_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM products
                        WHERE product_id = %s
                        """,
                        [product_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
            self,
            product_id: int,
            product: pro.ProductIn
            ) -> Union[List[pro.ProductOut], pro.Error]:
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
                            , supplier_id = %s
                            , alert_threshold = %s
                        WHERE product_id = %s
                        """,
                        [
                            product.name,
                            product.description,
                            product.price,
                            product.quantity_in_stock,
                            product.category,
                            product.supplier_id,
                            product.alert_threshold,
                            product_id
                        ]
                    )
                    return self.product_in_to_out(product_id, product)
        except Exception as e:
            print(e)
            return {"message": "Could not update product"}

    def partial_update(self,
                       product_id: int,
                       product: pro.ProductIn
                       ) -> Union[pro.ProductOut, pro.Error]:
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
                            , supplier_id = %s
                            , alert_threshold = %s
                        WHERE product_id = %s
                        """,
                        [
                            product.name,
                            product.description,
                            product.price,
                            product.quantity_in_stock,
                            product.category,
                            product.supplier_id,
                            product.alert_threshold,
                            product_id
                        ]
                    )
                    return self.product_in_to_out(product_id, product)
        except Exception as e:
            print(e)
            return {"message": "Could not update product"}

    def get_all(self) -> Union[List[pro.ProductOut], pro.Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM products
                        ORDER BY product_id
                        """
                    )
                    return [
                        self.record_to_product_out(record) for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all products"}

    def create(self, product: pro.ProductIn) -> pro.ProductOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO products
                        (name,
                        description,
                        price,
                        quantity_in_stock,
                        category,
                        supplier_id,
                        alert_threshold)
                        VALUES
                        (%s, %s, %s, %s, %s, %s,%s)
                        RETURNING product_id;
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
                product_id = result.fetchone()[0]
                return self.product_in_to_out(product_id, product)
        except Exception as e:
            print(e)
            return {"message": "Could not create product"}

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
            supplier_id=record[6],
            alert_threshold=record[7]
        )
