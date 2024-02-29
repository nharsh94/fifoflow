from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth_router
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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

@app.get("/")
def health_check():
    return {"Hello": "World"}

app.include_router(auth_router.router)