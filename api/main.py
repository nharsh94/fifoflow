from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, auth_router, user_router, orders
import os

from routers import shops


app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redocs",
    title="PackIt API",
    description=(
        "All PackIt endpoints needed to make any records to your warehouse."
    )
)

app.include_router(shops.router)
app.include_router(products.router)
app.include_router(auth_router.router)
app.include_router(user_router.router)

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

@app.post("/api/user")
def create_user(
    info: UserRequest,
    users: UserQueries = Depends(),
) -> UserResponse:
    hashed_password = authenticator.hash_password(info.password)
    ar = User(
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
        modified=user.modified.isoformat(),
    )

@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00"
        }
    }

app.include_router(auth_router.router)
app.include_router(orders.router)
