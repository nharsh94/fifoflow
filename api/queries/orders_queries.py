from models.orders import OrderItemsIn, OrdersIn, OrdersOut, OrderItemsOut
from queries.pool import pool
import datetime
import traceback


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
            traceback.print_exc()
            return {"message": "Order failed to create"}

    def order_in_out(
        self, order_id: int, order_date: datetime, order: OrdersIn
    ):
        old_data = order.dict()
        return OrdersOut(order_id=order_id, order_date=order_date, **old_data)

    def order_in_out_update(self, order_id: int, order: OrdersIn):
        old_data = order.dict()
        return OrdersOut(order_id=order_id, **old_data)

    def get_one_order(self, order_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            order_id, shop_id, user_id,
                            order_date, product_id,
                            quantity, total_price, status
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
            return {"message": "Failed to delete"}

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
        except Exception as e:
            traceback.print_exc()
            return f"Error updating order: {e}"
            # return {"message": "Failed to update order"}

    def get_all_orders(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT order_id, shop_id, user_id, order_date,
                                product_id, quantity,
                                total_price, status
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


class OrderItemsRepository:
    def create_order_item(self, order_item: OrderItemsIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO order_items
                        (shop_id, order_id, product_id, quantity,
                        unit_price, total_price, status)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            order_item.shop_id,
                            order_item.order_id,
                            order_item.product_id,
                            order_item.quantity,
                            order_item.unit_price,
                            order_item.total_price,
                            order_item.status,
                        ],
                    )
                    id = result.fetchone()[0]
                    return self.order_item_in_out(id, order_item)
        except Exception:
            return {"message": "Failed to create order item"}

    def order_items_in_out(self, id: int, order_item: OrderItemsIn):
        old_data = order_item.dict()
        return OrderItemsOut(id=id, **old_data)

    def get_one_order_item(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            id, shop_id, order_id,
                            product_id, quantity, unit_price,
                            total_price, status
                        FROM
                            order_items
                        WHERE
                            id = %s
                        """,
                        [id],
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_order_item_out(record)
        except Exception:
            return {"message": "Order items ID does not exist"}

    def record_to_order_item_out(self, record):
        return OrderItemsOut(
            id=record[0],
            shop_id=record[1],
            order_id=record[2],
            product_id=record[3],
            quantity=record[4],
            unit_price=record[5],
            total_price=record[6],
            status=record[7],
        )

    def delete_order_item(self, id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM order_items
                        WHERE id = %s
                        """,
                        [id],
                    )
                    return True
        except Exception:
            return {"message": "Failed to delete"}

    def update_order_item(self, id: int, order_item: OrderItemsIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE order_items
                        SET shop_id = %s,
                            order_id = %s,
                            product_id = %s,
                            quantity = %s,
                            unit_price = %s,
                            total_price = %s
                            status = %s
                        WHERE id = %s
                        """,
                        [
                            order_item.shop_id,
                            order_item.order_id,
                            order_item.product_id,
                            order_item.quantity,
                            order_item.unit_price,
                            order_item.total_price,
                            order_item.status,
                        ],
                    )
                    return self.order_items_in_out(id, order_item)
        except Exception:
            return {"message": "Failed to update order item"}

    def get_all_order_items(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, shop_id, order_id, product_id,
                            quantity, unit_price, total_price, status
                        FROM order_items
                        ORDER BY id
                        """
                    )
                    result = []
                    for record in db:
                        order_item = OrderItemsOut(
                            id=record[0],
                            shop_id=record[1],
                            order_id=record[2],
                            product_id=record[3],
                            quantity=record[4],
                            unit_price=record[5],
                            total_price=record[6],
                            status=record[7],
                        )
                        result.append(order_item)
                    return result
        except Exception:
            return {"message": "Failed to get all order items"}
