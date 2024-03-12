steps = [
    [
        """
        CREATE TYPE status_type AS ENUM('cancelled', 'submitted',
        'approved', 'updated');
        """
    ],
    [
        """
        CREATE TABLE orders (
            order_id SERIAL PRIMARY KEY,
            FOREIGN KEY (shop_id) INT REFERENCES shops(shop_id),
            FOREIGN KEY (role_id) INT REFERENCES profiles(role_id),
            order_date TIMESTAMP,
            order_item INT,
            FOREIGN KEY (product_id) INT REFERENCES products(product_id),
            quantity INT,
            total_price DECIMAL(10, 2)
            status status_type
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
            FOREIGN KEY (shop_id) INT REFERENCES shops(shop_id) NOT NULL,
            FOREIGN KEY (order_id) INT REFERENCES orders(order_id) NOT NULL,
            FOREIGN KEY (product_id) INT REFERENCES products(product_id) NOT NULL,
            quantity INT NOT NULL,
            unit_price DECIMAL(10, 2) NOT NULL,
            total_price DECIMAL(10, 2) NOT NULL,
            FOREIGN KEY (status) status_type REFERENCES orders(status)
        );
        """,
        """
        DROP TABLE order_items;
        """
    ]
]
