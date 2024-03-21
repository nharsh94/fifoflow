from fastapi import APIRouter, Depends, Response
from queries.roles_database import RoleRepository
from typing import List, Union, Optional
from models.roles import RoleIn, RoleOut, Error

router = APIRouter(tags=["Roles"], prefix="/api/role")


@router.post("/", response_model=Union[RoleOut, Error])
def create_role(
    role: RoleIn,
    repo: RoleRepository = Depends()
):
    return repo.create(role)


@router.get("/", response_model=Union[List[RoleOut], Error])
def get_all(repo: RoleRepository = Depends()):
    return repo.get_all()


@router.put("/{role_id}",
            response_model=Union[RoleOut, Error])
def update_role(role_id: int, role: RoleIn, repo: RoleRepository = Depends()
                ) -> Union[RoleOut, Error]:
    return repo.update(role_id, role)


@router.delete("/{role_id}", response_model=bool)
def delete_role(role_id: int, repo: RoleRepository = Depends()) -> bool:
    return repo.delete(role_id)


@router.get("/{role_id}", response_model=Optional[RoleOut])
def get_one_role(role_id: int, response: Response,
                 repo: RoleRepository = Depends()) -> RoleOut:
    role = repo.get_one(role_id)
    if role is None:
        response.status_code = 404
    return role
