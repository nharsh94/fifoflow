from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import List
from utils.authentication import (
    try_get_jwt_user_data,
    hash_password,
    generate_jwt,
    verify_password,
)
from queries.user_database import UserQueries
from models.users import UserRequest, UserResponse, UserWithPw
from models.userdata import UserData
from utils.exceptions import UserDatabaseException
from datetime import datetime, timedelta

router = APIRouter(tags=["User"], prefix="/api/user")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(
    token: str = Depends(oauth2_scheme),
) -> UserResponse:
    user_data = await try_get_jwt_user_data(token)
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication failed",
        )
    return user_data


async def authenticate_user(
    user_request: OAuth2PasswordRequestForm = Depends(),
):
    queries = UserQueries()
    user = queries.get_by_username(user_request.username)
    if not user or not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@router.post("/token")
async def login(user: UserWithPw = Depends(authenticate_user)):
    token_expiry = datetime.utcnow() + timedelta(hours=1)
    token = generate_jwt(user, expires_at=token_expiry)
    return {"access_token": token, "token_type": "bearer"}


@router.get("/list", response_model=List[UserResponse])
async def list_users(queries: UserQueries = Depends()) -> List[UserResponse]:
    user_list = queries.get_all_users()

    user_response_list = [
        UserResponse(id=user.id, username=user.username) for user in user_list
    ]

    return user_response_list


@router.post("/signup")
async def signup(
    new_user: UserRequest,
    queries: UserQueries = Depends(),
) -> dict:
    hashed_password = hash_password(new_user.password)

    try:
        user = queries.create_user(new_user.username, hashed_password)
    except UserDatabaseException as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    token = generate_jwt(user)

    # Return user_id along with the access token
    return {
        "message": "User signed up successfully",
        "user_id": user.id,  # Include the user ID in the response
        "access_token": token,
    }


@router.post("/signin")
async def signin(
    user_request: UserRequest,
    queries: UserQueries = Depends(),
) -> dict:
    user = queries.get_by_username(user_request.username)
    if not user or not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    token = generate_jwt(user)

    return {"message": "User signed in successfully", "access_token": token}


@router.get("/authenticate")
async def authenticate(
    user: UserResponse = Depends(get_current_user),
) -> UserResponse:
    return user


@router.delete("/signout")
async def signout():
    # Nothing to do here, as JWT tokens are stateless
    return {"message": "User signed out successfully"}


@router.get("/check-token")
async def check_token(token: str = Depends(get_current_user)):
    return {"message": "Token is valid"}


@router.get("/{username}")
def getall_userdata(username: str, repo: UserQueries = Depends()) -> UserData:
    userData = repo.get_all_data(username)
    if not userData:
        raise HTTPException(
            status_code=404, detail="No username matching found"
        )
    return userData
