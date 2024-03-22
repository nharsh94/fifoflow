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
