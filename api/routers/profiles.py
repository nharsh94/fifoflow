from fastapi import APIRouter, Depends, Response
from queries.profile_database import ProfileRepository
from typing import List, Union, Optional
import models.profiles as pro

router = APIRouter(tags=["Profiles"], prefix="/api/profile")


@router.post("/", response_model=Union[pro.ProfileOut, pro.Error])
def create_profile(
    profile: pro.ProfileIn,
    response: Response,
    repo: ProfileRepository = Depends()
):
    response.status_code = 400
    return repo.create(profile)


@router.get("/", response_model=Union[List[pro.ProfileOut], pro.Error])
def get_all(repo: ProfileRepository = Depends()):
    return repo.get_all()


@router.put("/{user_id}",
            response_model=Union[pro.ProfileOut, pro.Error])
def update_profile(user_id: int,
                   profile: pro.ProfileIn,
                   repo: ProfileRepository = Depends()
                   ) -> Union[pro.ProfileOut, pro.Error]:
    return repo.update(user_id, profile)


@router.delete("/{id}", response_model=bool)
def delete_profile(id: int,
                   repo: ProfileRepository = Depends()) -> bool:
    return repo.delete(id)


@router.get("/{id}", response_model=Optional[pro.ProfileOut])
def get_one_profile(id: int,
                    response: Response,
                    repo: ProfileRepository = Depends()) -> pro.ProfileOut:
    profile = repo.get_one(id)
    if profile is None:
        response.status_code = 404
    return profile
