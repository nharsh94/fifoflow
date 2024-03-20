from models.orders import OrdersIn, OrdersOut
from queries.pool import pool
import datetime

class OrdersRepository:
    def create_order(self, order: OrdersIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO orders
                            (shop_id, user_id,
                            product_id, quantity, total_price, status)
                        VALUES
                            (%s, %s, %s, %s, %s, %s)
                        RETURNING order_id, order_date;
                        """,
                        [
                            order.shop_id,
                            order.user_id,
                            order.product_id,
                            order.quantity,
                            order.total_price,
                            order.status,
                        ],
                    )
                    row = result.fetchone()
                    if row:
                        order_id, order_date = row
                    return self.order_in_out(order_id, order_date, order)
        except Exception:
            return {"message": "Order failed to create"}

    def get_one_order(self, order_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM
                            orders
                        WHERE
                            order_id = %s
                        """,
                        [order_id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_orders_out(record)
        except Exception:
            return {"message": "Order ID does not exist"}

    def delete_order(self, order_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM orders
                        WHERE order_id = %s
                        """,
                        [order_id],
                    )
                    return True
        except Exception:
            return False

    def update_order(self, order_id: int, order: OrdersOut):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE orders
                        SET shop_id = %s
                            , user_id = %s
                            , product_id = %s
                            , quantity = %s
                            , total_price = %s
                            , status = %s
                            , order_date = %s
                        WHERE order_id = %s
                        RETURNING *
                        """,
                        [
                            order.shop_id,
                            order.user_id,
                            order.product_id,
                            order.quantity,
                            order.total_price,
                            order.status,
                            order.order_date,
                            order_id,
                        ],
                    )
                    return self.order_in_out_update(order_id, order)
        except Exception:
            return {"message": "Could not update order"}

    def get_all_orders(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM orders
                        ORDER BY order_id
                        """
                    )
                    result = []
                    for record in db:
                        order = OrdersOut(
                            order_id=record[0],
                            shop_id=record[1],
                            user_id=record[2],
                            order_date=record[3],
                            product_id=record[4],
                            quantity=record[5],
                            total_price=record[6],
                            status=record[7],
                        )
                        result.append(order)
                    return result
        except Exception:
            return {"message": "Failed to get all orders"}

    def order_in_out(
        self, order_id: int, order_date: datetime, order: OrdersIn
    ):
        old_data = order.dict()
        return OrdersOut(order_id=order_id, **old_data)

    def order_in_out_update(
        self, order_id: int, order: OrdersIn
    ):
        old_data = order.dict()
        return OrdersOut(order_id=order_id, **old_data)

    def record_to_orders_out(self, record):
        return OrdersOut(
            order_id=record[0],
            shop_id=record[1],
            user_id=record[2],
            order_date=record[3],
            product_id=record[4],
            quantity=record[5],
            total_price=record[6],
            status=record[7],
        )
