from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from datetime import datetime


# Common fields for all accounts
class Account(BaseModel):
    first_name: str
    last_name: str
    email: str
    username: str


# What we get from the database
class DBAccount(Account):
    id: int
    modified: datetime
    password_hash: str


# What we return to the browser
class AccountOut(Account):
    id: int
    modified: str


# What we receive from the login form
class AccountIn(Account):
    password: str


# The JWT token plus the account data
class AccountToken(Token):
    account: AccountOut


class AuthenticationException(Exception):
    pass
