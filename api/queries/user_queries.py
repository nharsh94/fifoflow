from psycopg.rows import class_row
from psycopg_pool import ConnectionPool
import os
from models import Account, DBAccount
from models import AuthenticationException

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class AccountRepo:
    def get_user_by_id(self, pk: int) -> DBAccount:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(DBAccount)) as cur:
                cur.execute(
                    """
                    SELECT id, username, first_name, last_name,
                        modified, email, password_hash
                    FROM accounts
                    WHERE id = %s;
                    """,
                    [pk],
                )
                ac = cur.fetchone()
                if ac is None:
                    raise AuthenticationException("No account found")
                else:
                    return ac

    def get(self, username: str) -> DBAccount | None:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(DBAccount)) as cur:
                cur.execute(
                    """
                    SELECT id, username, first_name, last_name,
                        modified, email, password_hash
                    FROM accounts
                    WHERE username = %s;
                    """,
                    [username],
                )
                return cur.fetchone()

    def create_user(self, account: Account, hashed_password: str) -> int:
        with pool.connection() as conn:
            with conn.cursor(row_factory=class_row(DBAccount)) as cur:
                cur.execute(
                    """
                    INSERT INTO accounts
                    (username, password_hash, first_name,
                        last_name, email)
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    (
                        account.username,
                        hashed_password,
                        account.first_name,
                        account.last_name,
                        account.email,
                    ),
                )
                new_account = cur.fetchone()
                if not new_account:
                    raise AuthenticationException("Error creating Account")

                return new_account.id
