from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, auth_router, user_router
import os

app = FastAPI()
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
