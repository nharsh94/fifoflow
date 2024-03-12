steps = [
    [
        # "Up" SQL statement for creating products table
        """
        CREATE TABLE products (
            product_id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            quantity_in_stock INT NOT NULL,
            category VARCHAR(100) NOT NULL,
            supplier_id INT NOT NULL,
            alert_threshold INT NOT NULL,
            FOREIGN KEY (supplier_id)
            REFERENCES profiles(user_id)
        );
        """,
        # "Down" SQL statement for dropping products table
        """
        DROP TABLE products;
        """
    ]
]



