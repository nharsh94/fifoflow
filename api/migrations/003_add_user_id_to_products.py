steps = [
    [
        # "Up" SQL statement
        """
        ALTER TABLE products
        ADD user_id integer NOT NULL DEFAULT(1) REFERENCES users(id);
        """,
        # "Down" SQL statement
        """
        DROP COLUMN user_id;
        """,
    ],
]
