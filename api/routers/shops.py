from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional

from queries.shop_database import (
    Error,
    ShopIn,
    ShopRepository,
    ShopOut,
)

router = APIRouter()


@router.post("/shops", response_model=Union[ShopOut, Error], tags=["Shops"])
def create_shop(
    shop: ShopIn,
    repo: ShopRepository = Depends(),
):
    return repo.create(shop)


@router.get("/shops",
            response_model=Union[List[ShopOut], Error],
            tags=["Shops"])
def get_all(
    repo: ShopRepository = Depends(),
):
    return repo.get_all()


@router.put("/shops/{shops_id}",
            response_model=Union[ShopOut, Error],
            tags=["Shops"])
def update_shop(
    shops_id: int,
    shop: ShopIn,
    repo: ShopRepository = Depends(),
) -> Union[Error, ShopOut]:
    return repo.update(shops_id, shop)


@router.delete("/shops/{shops_id}", response_model=bool, tags=["Shops"])
def delete_shop(
    shops_id: int,
    repo: ShopRepository = Depends(),
) -> bool:
    return repo.delete(shops_id)


@router.get("/shops/{shops_id}",
            response_model=Optional[ShopOut],
            tags=["Shops"])
def get_shop(
    shops_id: int,
    response: Response,
    repo: ShopRepository = Depends(),
) -> ShopOut:
    shop = repo.get_one(shops_id)
    if shop is None:
        response.status_code = 404
    return shop
