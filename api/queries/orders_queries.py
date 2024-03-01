from models.orders import OrderItemsIn, OrdersIn, OrdersOut, OrderItemsOut
from pool import pool


class OrdersRepository:
    def create_order(self, order: OrdersIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO orders
                            (shop_id, employee_id, customer_id, order_date,
                            order_item, product_id, quantity, total_price)
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING order_id;
                        """,
                        [
                            order.shop_id,
                            order.employee_id,
                            order.customer_id,
                            order.order_date,
                            order.order_item,
                            order.product_id,
                            order.quantity,
                            order.total_price
                        ]
                    )
                    order_id = result.fetchone()[0]
                    return self.order_in_out(order_id, order)
        except Exception:
            return {"message": "Order failed to create"}

    def order_in_out(self, order_id: int, order: OrdersIn):
        old_data = order.dict()
        return OrdersOut(order_id=order_id, **old_data)

    def get_one_order(self, order_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT
                            order_id, shop_id, employee_id,
                            customer_id, order_date, order_item,
                            product_id, quantity, total_price
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
                    return self.record_to_shop_out(record)
        except Exception:
            return {"message": "Order ID does not exist"}

    def record_to_orders_out(self, record):
        return OrdersOut(
            order_id=record[0],
            shop_id=record[1],
            employee_id=record[2],
            customer_id=record[3],
            order_date=record[4],
            order_item=record[5],
            product_id=record[6],
            quantity=record[7],
            total_price=record[8]
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

    def update_order(self, order_id: int, order: OrdersIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE orders
                        SET shop_id = %s
                            , employee_id = %s
                            , customer_id = %s
                            , order_date = %s
                            , order_item = %s
                            , product_id = %s
                            , quantity = %s
                            , total_price = %s
                        WHERE order_id = %s
                        """
                        [order.shop_id, order.employee_id, order.customer_id,
                         order.order_date, order.order_item, order.product_id,
                         order.quantity, order.total_price, order_id]
                    )
                    return self.order_in_out(order_id, order)
        except Exception:
            return {"message": "Failed to update order"}

    def get_all_orders(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT order_id, shop_id, employee_id, customer_id,
                            order_date, order_item, product_id, quantity,
                            total_price
                        FROM orders
                        ORDER BY order_id
                        """
                    )
                    result = []
                    for record in db:
                        order = OrdersOut(
                            order_id=record[0],
                            shop_id=record[1],
                            employee_id=record[2],
                            customer_id=record[3],
                            order_date=record[4],
                            order_item=record[5],
                            product_id=record[6],
                            quantity=record[7],
                            total_price=record[8]
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
                        unit_price, total_price)
                        VALUES
                        (%s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [order_item.shop_id, order_item.order_id,
                            order_item.product_id, order_item.quantity,
                            order_item.unit_price, order_item.total_price]
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
                            total_price
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
            total_price=record[6]
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
                        WHERE id = %s
                        """
                        [order_item.shop_id, order_item.order_id,
                            order_item.product_id, order_item.quantity,
                            order_item.unit_price, order_item.total_price]
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
                            quantity, unit_price, total_price
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
                            total_price=record[6]
                        )
                        result.append(order_item)
                    return result
        except Exception:
            return {"message": "Failed to get all order items"}
