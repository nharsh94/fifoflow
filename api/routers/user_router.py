from models.users import UserRequest, UserResponse, UserWithPw
from queries.user_queries import UserQueries
from authenticator import authenticator
from fastapi import Depends, HTTPException, status, APIRouter

router = APIRouter(tags=["User"], prefix="/api/user")

@router.get("{pk}")
async def get_user(
    pk: int,
    users: UserQueries = Depends(),
    ra=Depends(authenticator.get_current_account_data),
) -> UserResponse:
    if not ra:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    try:
        user = users.get_user_by_id(pk)
    except Exception as e:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, detail=str(e))
    return UserResponse(
        id=user.id,
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        modified=user.modified.isoformat(),
    )

@router.post("/")
def create_user(
    info: UserRequest,
    users: UserQueries = Depends(),
) -> UserResponse:
    hashed_password = authenticator.hash_password(info.password)
    ar = UserWithPw(
        username=info.username,
        first_name=info.first_name,
        last_name=info.last_name,
        email=info.email,
    )
    try:
        pk = users.create_user(ar, hashed_password)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    user = users.get_user_by_id(pk)
    return UserResponse(
        id=user.id,
        username=user.username,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
    )