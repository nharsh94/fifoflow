steps = [
    [
        """
        CREATE TABLE orders (
            order_id SERIAL PRIMARY KEY,
            shop_id INT REFERENCES shops(shop_id),
            employee_id INT REFERENCES
            profiles(user_id),
            customer_id INT REFERENCES
            profiles(user_id),
            order_date TIMESTAMP,
            order_item INT,
            product_id INT REFERENCES products(product_id),
            quantity INT,
            total_price DECIMAL(10, 2)
        );
        """,
        """
        DROP TABLE orders;
        """
    ],
    [
        """
        CREATE TABLE order_items (
            id SERIAL PRIMARY KEY NOT NULL,
            shop_id INT REFERENCES shops(shop_id) NOT NULL,
            order_id INT REFERENCES orders(order_id) NOT NULL,
            product_id INT REFERENCES products(product_id) NOT NULL,
            quantity INT NOT NULL,
            unit_price DECIMAL(10, 2) NOT NULL,
            total_price DECIMAL(10, 2) NOT NULL
        );
        """,
        """
        DROP TABLE order_items;
        """
    ]
]
