import pytest
from unittest.mock import MagicMock
from utils.authentication import verify_password, hash_password, generate_jwt
from models.users import UserWithPw
from psycopg_pool import ConnectionPool


DATABASE_URL = "postgresql://packit1:packit@postgres/packit"

pool = ConnectionPool(DATABASE_URL)


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
    # Check if DATABASE_URL is set
    if DATABASE_URL is None:
        pytest.skip("DATABASE_URL environment variable is not set")

    # Mock the get_by_username method of UserQueries
    mock_user_queries = MagicMock()
    mock_user_queries.get_by_username.side_effect = lambda username: (
        mock_user if username == "test_user" else None
    )
