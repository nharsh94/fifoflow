# authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.user_database import UserQueries
from models.users import UserResponse, UserWithPw


class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        users: UserQueries,
    ) -> UserResponse:
        user = users.get_by_username(username)
        if not user:
            raise Exception("User not found")
        return user

    def get_account_getter(
        self,
        users: UserQueries = Depends(),
    ):
        return users

    def get_hashed_password(self, user: UserWithPw):
        return user.password_hash

    def get_account_data_for_cookie(self, user: UserWithPw):
        return user.username, UserResponse(id=user.id, username=user.username)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
