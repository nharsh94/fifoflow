from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union, Optional
from models.profiles import ProfileIn, ProfileOut, Error
from queries.profile_database import ProfileRepository

router = APIRouter(tags=["Profiles"], prefix="/api/profile")


@router.post("/", response_model=Union[ProfileOut, Error])
def create_profile(profile: ProfileIn, repo: ProfileRepository = Depends()):
<<<<<<< HEAD
=======
    if profile.user_id == 0:
        raise HTTPException(status_code=400, detail="Invalid User ID")
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
    return repo.create(profile)


@router.get("/", response_model=Union[List[ProfileOut], Error])
def get_all_profiles(repo: ProfileRepository = Depends()):
<<<<<<< HEAD
    return repo.get_all()
=======
    profiles = repo.get_all()
    if not profiles:
        raise HTTPException(status_code=404, detail="No profiles found")
    return profiles
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8


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
    if not profile:
        raise HTTPException(status_code=404, detail="No profiles matching ID")
    return profile
