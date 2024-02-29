steps = [
    [
        """
        CREATE TABLE products (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            quantity_in_stock INT NOT NULL,
            category VARCHAR(100) NOT NULL,
            supplier_id INT reference supplier_users(supplier_id),
            alert_threshold INT NOT NULL,
        );
        """,
        """
        DROP TABLE products;
        """
    ]
]
