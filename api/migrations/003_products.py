steps = [
    [
        """
        CREATE TABLE products (
            product_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            quantity_in_stock INT NOT NULL,
            category VARCHAR(100) NOT NULL,
            alert_threshold INT NOT NULL,
            stock_alert BOOLEAN DEFAULT FALSE,
            shop_name VARCHAR(150),
            CONSTRAINT shop_name
                FOREIGN KEY(shop_name)
                    REFERENCES shops(shop_name)
                    ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE products;
        """,
    ]
]
