from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, auth_router, user_router, orders, profiles
import os

from routers import shops


app = FastAPI(
    docs_url="/api/docs",
    redoc_url="/api/redocs",
    title="PackIt API",
    description=(
        "All PackIt endpoints needed to make any records to your warehouse."
    ),
)
app.include_router(shops.router)
app.include_router(products.router)
app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(orders.router)
app.include_router(profiles.router)

CORS_HOST = os.environ.get("CORS_HOST")
if not CORS_HOST:
    origins = ["http://localhost:3000", "http://localhost:5173"]
else:
    origins = [CORS_HOST]


# @app.get("/")
# def root():
#     return {"message": "You hit the root path!"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)