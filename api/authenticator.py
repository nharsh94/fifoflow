# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries import AccountRepo
from models import AccountOut, DBAccount


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountRepo,
    ) -> DBAccount:  # Add!!!
        # Use your repo to get the account based on the
        # username (which could be an email)
        account = accounts.get(username)
        if not account:
            raise Exception("Account not found")
        return account

    def get_account_getter(
        self,
        accounts: AccountRepo = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: DBAccount):
        # Return the encrypted password value from your
        # account object
        return account.password_hash

    def get_account_data_for_cookie(self, account: DBAccount):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(
            id=account.id,
            username=account.username,
            first_name=account.first_name,
            last_name=account.last_name,
            age=account.age,
            email=account.email,
            modified=account.modified.isoformat(),
        )


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
