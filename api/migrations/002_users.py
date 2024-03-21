steps = [
    [
        # "Up" SQL statement for creating users table
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(256) NOT NULL
        );
        """,
        # "Down" SQL statement for dropping users table
        """
        DROP TABLE users;
        """,
        # "Down" SQL statement for dropping users table
        """
        DROP TABLE users;
        """,
    ],
    [
        # "Up" SQL statement for creating roles table
        """
        CREATE TYPE role_type
        AS ENUM('Admin', 'Manager', 'Employee', 'Supplier', 'Customer');
        """,
        # "Down" SQL statement for dropping roles table
        """
        DROP TYPE role_type;
        # "Up" SQL statement for creating roles table
        """
        CREATE TYPE role_type
        AS ENUM('Admin', 'Manager', 'Employee', 'Supplier', 'Customer');
        """,
        # "Down" SQL statement for dropping roles table
        """
        DROP TYPE role_type;
        """,
    ],
    [
        # "Up" SQL statement for creating profiles table
    ],
    [
        # "Up" SQL statement for creating profiles table
        """
        CREATE TABLE profiles (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL UNIQUE,
            role role_type,
        CREATE TABLE profiles (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL UNIQUE,
            role role_type,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            phone VARCHAR(12) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
            phone VARCHAR(12) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        """,
        # "Down" SQL statement for dropping profiles table
        """
        DROP TABLE profiles;
        """,
    ]
]
