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
        """
    ],
    [
        # "Up" SQL statement for creating roles table
        """
        CREATE TABLE roles (
            role_id SERIAL PRIMARY KEY,
            role_name VARCHAR(50) UNIQUE NOT NULL
        );
        """,
        # "Down" SQL statement for dropping roles table
        """
        DROP TABLE roles;
        """
    ],
    [
        # "Up" SQL statement for creating profiles table
        """
        CREATE TABLE profiles (
            id SERIAL PRIMARY KEY NOT NULL,
            user_id INT NOT NULL UNIQUE,
            role_id INT NOT NULL,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            phone VARCHAR(12) NOT NULL,
            password VARCHAR(8) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (role_id) REFERENCES roles(role_id)
        );
        """,
        # "Down" SQL statement for dropping profiles table
        """
        DROP TABLE profiles;
        """
    ]
]
