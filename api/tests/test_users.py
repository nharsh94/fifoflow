<<<<<<< HEAD
# import pytest
# from unittest.mock import AsyncMock, MagicMock
# from fastapi import HTTPException, status
# from queries.user_database import UserQueries
# from utils.authentication import verify_password, hash_password, generate_jwt
# from models.users import UserWithPw


# @pytest.fixture
# def mock_user_queries():
#     return UserQueries()


# @pytest.fixture
# def mock_user():
#     return UserWithPw(
#         id=1, username="test_user", password=hash_password("password")
#     )


# @pytest.mark.asyncio
# async def test_verify_password(mock_user):
#     # Test valid password
#     assert verify_password("password", mock_user.password)
#     # Test invalid password
#     assert not verify_password("wrong_password", mock_user.password)


# @pytest.mark.asyncio
# async def test_hash_password():
#     # Test password hashing
#     password = "password"
#     hashed_password = hash_password(password)
#     assert verify_password(password, hashed_password)


# @pytest.mark.asyncio
# async def test_generate_jwt(mock_user):
#     # Test JWT generation
#     token = generate_jwt(mock_user)
#     assert isinstance(token, str)
#     # You can also decode the token and assert its contents if needed


# @pytest.mark.asyncio
# async def test_get_by_username(mock_user_queries, mock_user):
#     # Mock the get_by_username method of UserQueries
#     mock_user_queries.get_by_username = AsyncMock(return_value=mock_user)
#     # Test valid username
#     assert await mock_user_queries.get_by_username("test_user") == mock_user
#     # Test invalid username
#     assert await mock_user_queries.get_by_username("nonexistent_user")
#   is None
=======
from fastapi.testclient import TestClient
from main import app
from jose import jwt
from datetime import datetime, timedelta

client = TestClient(app)


def create_token(user_id: int, expires_delta: timedelta = None):
    to_encode = {"sub": user_id}
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, "secret", algorithm="HS256")
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
