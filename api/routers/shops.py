from fastapi import APIRouter, Depends, HTTPException
from typing import Union, List, Optional

from queries.shop_database import (
    Error,
    ShopIn,
    ShopRepository,
    ShopOut,
)

router = APIRouter(tags=["Shops"], prefix="/api/shops")


@router.post("/",
             response_model=Union[ShopOut, Error],
             tags=["Shops"])
def create_shop(
    shop: ShopIn,
    repo: ShopRepository = Depends(),
):
    return repo.create(shop)


@router.get("/", response_model=Union[List[ShopOut], Error], tags=["Shops"])
def get_all(
    repo: ShopRepository = Depends(),
):
    shops = repo.get_all()
    if not shops:
        raise HTTPException(status_code=404, detail="No shops found")
    return shops


@router.put(
    "/{shops_id}", response_model=Union[ShopOut, Error], tags=["Shops"]
)
def update_shop(
    shops_id: int,
    shop: ShopIn,
    repo: ShopRepository = Depends(),
) -> Union[Error, ShopOut]:
    return repo.update(shops_id, shop)


@router.delete("/{shops_id}",
               response_model=bool,
               tags=["Shops"])
def delete_shop(
    shops_id: int,
    repo: ShopRepository = Depends(),
) -> bool:
    return repo.delete(shops_id)


@router.get("/{shops_id}", response_model=Optional[ShopOut], tags=["Shops"])
def get_shop(
    shops_id: int,
    repo: ShopRepository = Depends(),
) -> ShopOut:
    shop = repo.get_one(shops_id)
    if not shop:
        raise HTTPException(status_code=404, detail="No shops matching ID")
    return shop
