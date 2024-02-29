# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.user_queries import UserQueries
from models.users import UserResponse, DBUser


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: UserQueries,
    ) -> DBUser:  # Add!!!
        # Use your repo to get the user based on the
        # username (which could be an email)
        user = users.get(username)
        if not user:
            raise Exception("user not found")
        return user

    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        # Return the users. That's it.
        return users

    def get_hashed_password(self, user: DBUser):
        # Return the encrypted password value from your
        # user object
        return user.password_hash

    def get_user_data_for_cookie(self, user: DBUser):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return user.username, UserResponse(
            id=user.id,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            modified=user.modified.isoformat(),
        )


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
