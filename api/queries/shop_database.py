"""
Database Queries for Shops
"""

from models.shops import ShopIn, ShopOut, Error

from typing import List, Union, Optional
from queries.pool import pool


class ShopRepository:
    def get_one(self, shops_id: int) -> Optional[ShopOut]:
        """
        Fetch a single shop in the database by shop_id

        Returns None if the shop isn't found

        Raises a Error message if fetching the shop fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT shop_id
                             , shop_name
                             , address
                             , phone
                        FROM shops
                        WHERE shop_id = %s
                        """,
                        [shops_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_shop_out(record)
        except Exception:
            return {"message": "Could not get Shop"}

    def delete(self, shops_id: int) -> bool:
        """
        Deletes a shop in the database by shop_id
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM shops
                        WHERE shop_id = %s
                        """,
                        [shops_id],
                    )
                    return True
        except Exception:
            return False

    def update(
        self, shops_id: int, shop: ShopIn
    ) -> Union[List[ShopOut], Error]:
        """
        Updates a shop in the database

        Raises a Error message if updating the shop fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE shops
                        SET shop_name = %s
                          , address = %s
                          , phone = %s
                          WHERE shop_id = %s
                        """,
                        [shop.shop_name, shop.address, shop.phone, shops_id],
                    )
                    return self.shop_in_out(shops_id, shop)

        except Exception:
            return {"message": "Could not update Shop"}

    def get_all(self) -> Union[Error, List[ShopOut]]:
        """
        Fetches a list of shops in the database

        Raises a Error message if fetching the shop list fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT shop_id, shop_name, address, phone
                        FROM shops
                        ORDER BY shop_id;
                        """
                    )
                    result = []
                    for record in db:
                        shop = ShopOut(
                            shop_id=record[0],
                            shop_name=record[1],
                            address=record[2],
                            phone=record[3],
                        )
                        result.append(shop)
                    return result
        except Exception:
            return {"message": "Could not get all Shops"}

    def create(self, shop: ShopIn) -> ShopOut:
        """
        Creates a new shop in the database

        Raises an Error message if creating the shop fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO shops
                        (shop_name, address, phone)
                        VALUES
                        (%s, %s, %s)
                        RETURNING shop_id;
                        """,
                        [shop.shop_name, shop.address, shop.phone],
                    )
                    shop_id = result.fetchone()[0]
                    return self.shop_in_out(shop_id, shop)
        except Exception:
            return {"message": "Could not create Shop"}

    def shop_in_out(self, shop_id: int, shop: ShopIn):
        old_data = shop.dict()
        return ShopOut(shop_id=shop_id, **old_data)

    def record_to_shop_out(self, record):
        return ShopOut(
            shop_id=record[0],
            shop_name=record[1],
            address=record[2],
            phone=record[3],
        )
