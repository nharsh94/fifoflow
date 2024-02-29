steps = [
    [
        """
        CREATE TABLE supplier_users (
            supplier_id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            phone VARCHAR(12) NOT NULL
        );
        """,
        """
        DROP TABLE supplier_users;
        """
    ],
    [
        """
        CREATE TABLE employee_users (
            employee_id SERIAL PRIMARY KEY NOT NULL,
            shop_id INT references shops(shop_id),
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            phone VARCHAR(12) NOT NULL
        );
        """,
        """
        DROP TABLE employee_users;
        """
    ],
    [
        """
        CREATE TABLE customer_users (
            customer_id SERIAL PRIMARY KEY NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            phone VARCHAR(12) NOT NULL
        );
        """,
        """
        DROP TABLE customer_users;
        """
    ]
]
