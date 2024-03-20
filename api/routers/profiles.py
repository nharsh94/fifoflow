from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from models.profiles import ProfileIn, ProfileOut, Error
from queries.profile_database import ProfileRepository

router = APIRouter(tags=["Profiles"], prefix="/api/profile")


@router.post("/", response_model=Union[ProfileOut, Error])
def create_profile(profile: ProfileIn, repo: ProfileRepository = Depends()):
    return repo.create(profile)


@router.get("/", response_model=Union[List[ProfileOut], Error])
def get_all_profiles(repo: ProfileRepository = Depends()):
    return repo.get_all()


@router.put("/{user_id}", response_model=Union[ProfileOut, Error])
def update_profile(
    user_id: int, profile: ProfileIn, repo: ProfileRepository = Depends()
):
    return repo.update(user_id, profile)


@router.delete("/{user_id}", response_model=bool)
def delete_profile(user_id: int, repo: ProfileRepository = Depends()):
    return repo.delete(user_id)


@router.get("/{user_id}", response_model=Optional[ProfileOut])
def get_profile(
    user_id: int, response: Response, repo: ProfileRepository = Depends()
):
    profile = repo.get_one(user_id)
    if profile is None:
        response.status_code = 404
    return profile
