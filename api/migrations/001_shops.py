steps = [
    [
        """
        CREATE TABLE shops (
            shop_id SERIAL PRIMARY KEY NOT NULL,
            shop_name VARCHAR(100) NOT NULL,
            address VARCHAR(100) NOT NULL,
            phone VARCHAR(15) NOT NULL
        );
        """,
        """
        DROP TABLE shops;
        """
    ]
]
