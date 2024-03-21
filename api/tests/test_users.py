import pytest
from unittest.mock import MagicMock
from utils.authentication import verify_password, hash_password, generate_jwt
from models.users import UserWithPw
import os

DATABASE_URL = os.environ.get("DATABASE_URL")


@pytest.fixture
def mock_user():
    return UserWithPw(
        id=1, username="test_user", password=hash_password("password")
    )


def test_verify_password(mock_user):
    # Test valid password
    assert verify_password("password", mock_user.password)
    # Test invalid password
    assert not verify_password("wrong_password", mock_user.password)


def test_hash_password():
    # Test password hashing
    password = "password"
    hashed_password = hash_password(password)
    assert verify_password(password, hashed_password)


def test_generate_jwt(mock_user):
    # Test JWT generation
    token = generate_jwt(mock_user)
    assert isinstance(token, str)


def test_get_by_username(mock_user):
    # Mock the get_by_username method of UserQueries
    mock_user_queries = MagicMock()
    mock_user_queries.get_by_username.side_effect = lambda username: (
        mock_user if username == "test_user" else None
    )

    # Test valid username
    assert mock_user_queries.get_by_username("test_user") == mock_user
    # Test invalid username
    assert mock_user_queries.get_by_username("nonexistent_user") is None
