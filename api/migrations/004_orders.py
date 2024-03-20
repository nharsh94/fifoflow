steps = [
    [
        """
        CREATE TYPE status_type
        AS ENUM('cancelled', 'submitted', 'approved', 'updated');
        """,
        """
        DROP TYPE status_type ;
        """,
    ],
    [
        """
        CREATE TABLE orders (
            order_id SERIAL PRIMARY KEY,
            shop_id INT,
            user_id INT,
            order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            product_id INT,
            quantity INT,
            total_price DECIMAL(10, 2),
            status status_type,
            FOREIGN KEY (shop_id) REFERENCES shops(shop_id),
            FOREIGN KEY (user_id) REFERENCES profiles(user_id),
            FOREIGN KEY (product_id) REFERENCES products(product_id)
        );
        """,
        """
        DROP TABLE orders;
        """,
    ],
]
