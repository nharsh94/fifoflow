from models.orders import OrderItemsIn, OrdersIn, OrdersOut


class OrdersRepository:
    def create(self, order: OrdersIn):
        with pool.connection() as conn:
            with conn.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO orders
                        (shop_id, employee_id, customer_id, order_date, order_item, product_id, quantity, total_price)
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
                id = result.fetchone()[0]
                old_data = order.dict()
                return OrdersOut(id=id, **old_data)
