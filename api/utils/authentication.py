import os
import bcrypt
from calendar import timegm
from datetime import datetime, timedelta
from fastapi import Cookie
from jose import JWTError, jwt
from jose.constants import ALGORITHMS
from typing import Annotated, Optional
from models.jwt import JWTPayload, JWTUserData
from queries.user_database import UserWithPw

# If you ever need to change the hashing algorithm, you can change it here
ALGORITHM = ALGORITHMS.HS256

# We pull this from the environment
SIGNING_KEY = os.environ.get("SIGNING_KEY")
if not SIGNING_KEY:
    raise ValueError("SIGNING_KEY environment variable not set")


async def decode_jwt(token: str) -> Optional[JWTPayload]:
    """
    Helper function to decode the JWT from a token string
    """
    try:
        payload = jwt.decode(token, SIGNING_KEY, algorithms=[ALGORITHM])
        return JWTPayload(**payload)
    except (JWTError, AttributeError) as e:
        print(e)
    return None


async def try_get_jwt_user_data(
    fast_api_token: Annotated[str | None, Cookie()] = None,
) -> tuple[Optional[JWTUserData], Optional[str]]:
    """
    This function attempts to decode the JWT token from the provided FastAPI cookie.
    It returns the decoded JWT payload (if valid) along with the cookie value.
    """
    if not fast_api_token:
        return None, None

    # Decode the JWT token
    payload = await decode_jwt(fast_api_token)
    if not payload:
        return None, None

    return payload.user, fast_api_token


def verify_password(plain_password, hashed_password) -> bool:
    """
    This verifies the user's password, by hashing the plain
    password and then comparing it to the hashed password
    from the database
    """
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )


def hash_password(plain_password) -> str:
    """
    Helper function that hashes a password
    """
    return bcrypt.hashpw(
        plain_password.encode("utf-8"), bcrypt.gensalt()
    ).decode()


def generate_jwt(
    user: UserWithPw, expires_at: Optional[datetime] = None
) -> str:
    """
    Generates a new JWT token using the user's information
    Optionally accepts an expiration time for the token
    """
    exp = expires_at or datetime.utcnow() + timedelta(hours=1)
    jwt_data = JWTPayload(
        exp=timegm(exp.utctimetuple()),
        sub=user.username,
        user=JWTUserData(username=user.username, id=user.id),
    )
    encoded_jwt = jwt.encode(
        jwt_data.model_dump(), SIGNING_KEY, algorithm=ALGORITHMS.HS256
    )
    return encoded_jwt
