steps = [
    [
        """
        CREATE TABLE order_items (
            id SERIAL PRIMARY KEY NOT NULL,
            shop_id INT references shops(id) NOT NULL,
            order_id INT reference orders(id) NOT NULL,
            product_id INT reference products(id) NOT NULL,
            quantity INT NOT NULL,
            unit_price DECIMAL(10, 2) NOT NULL,
            total_price DECIMAL(10, 2) NOT NULL,
        );
        """,
        """
        DROP TABLE order_items;
        """
    ]
    [
        """
        CREATE TABLE orders(
            order_id SEARIAL PRIMART KEY,
            shop_id INT REFERENCES shops(shop_id),
            employee_id INT references employee_users(employee_id),
            customer_id INT references customer_users(customer_id),
            order_date TIMESTAMP,
            order_item INT,
            product_id INT references products(product_id),
            quantity INT,
            total_price DECIMAL(10, 2),
        );
        """,
        """
        DROP TABLE vacations;
        """
    ]
]
