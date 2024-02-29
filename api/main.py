from fastapi import FastAPI, Depends, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
import os
from models import AccountOut, AccountIn, Account, AccountToken
from queries.user_queries import AccountRepo
from authenticator import MyAuthenticator
from models import AuthenticationException

authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
app = FastAPI()
app.include_router(authenticator.router)

CORS_HOST = os.environ.get("CORS_HOST")
if not CORS_HOST:
    origins = ["http://localhost:3000", "http://localhost:5173"]
else:
    origins = [CORS_HOST]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/user/{pk}")
async def get_user(
    pk: int,
    accounts: AccountRepo = Depends(),
    ra=Depends(authenticator.get_current_account_data),
) -> AccountOut:
    if not ra:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    try:
        account = accounts.get_user_by_id(pk)
    except AuthenticationException:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return AccountOut(
        id=account.id,
        username=account.username,
        first_name=account.first_name,
        last_name=account.last_name,
        email=account.email,
        modified=account.modified.isoformat(),
    )


# Creates a new user
@app.post("/api/user")
def create_user(
    info: AccountIn,
    accounts: AccountRepo = Depends(),
) -> AccountOut:
    hashed_password = authenticator.hash_password(info.password)
    ar = Account(
        username=info.username,
        first_name=info.first_name,
        last_name=info.last_name,
        email=info.email,
    )
    try:
        pk = accounts.create_user(ar, hashed_password)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    account = accounts.get_user_by_id(pk)
    return AccountOut(
        id=account.id,
        username=account.username,
        first_name=account.first_name,
        last_name=account.last_name,
        email=account.email,
        modified=account.modified.isoformat(),
    )


# Verifies that the user is logged in
@app.get("/token")
async def get_by_cookie(
    request: Request,
    account_data: dict
    | None = Depends(authenticator.try_get_current_account_data),
    accounts: AccountRepo = Depends(),
    ra=Depends(authenticator.get_current_account_data),
) -> AccountToken:
    if not account_data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    account = await get_user(account_data["id"], accounts=accounts, ra=ra)

    account_token = {
        "access_token": request.cookies[authenticator.cookie_name],
        "type": "Bearer",
        "account": account,
    }
    return AccountToken(**account_token)
