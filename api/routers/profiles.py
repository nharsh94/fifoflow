from fastapi import APIRouter, Depends, Response, HTTPException
from queries.profile_database import ProfileRepository
from typing import List, Union, Optional
from models.profiles import ProfileIn, ProfileOut, Error

router = APIRouter(tags=["Profiles"], prefix="/api/profile")


@router.post("/", response_model=Union[ProfileOut, Error])
def create_profile(
    profile: ProfileIn,
    repo: ProfileRepository = Depends()
):
    if profile.user_id == 0:
        raise HTTPException(status_code=400, detail="Invalid User ID")
    return repo.create(profile)


@router.get("/", response_model=Union[List[ProfileOut], Error])
def get_all(repo: ProfileRepository = Depends()):
    profiles = repo.get_all()
    if not profiles:
        raise HTTPException(status_code=404, detail="No profiles found")
    return profiles


@router.put("/{user_id}",
            response_model=Union[ProfileOut, Error])
def update_profile(user_id: int,
                   profile: ProfileIn,
                   repo: ProfileRepository = Depends()
                   ) -> Union[ProfileOut, Error]:
    return repo.update(user_id, profile)


@router.delete("/{user_id}", response_model=bool)
def delete_profile(user_id: int,
                   repo: ProfileRepository = Depends()) -> bool:
    return repo.delete(user_id)


@router.get("/{user_id}", response_model=Optional[ProfileOut])
def get_one_profile(user_id: int,
                    response: Response,
                    repo: ProfileRepository = Depends()) -> ProfileOut:
    profile = repo.get_one(user_id)
    if not profile:
        raise HTTPException(status_code = 404, detail="No profiles matching ID")
    return profile
