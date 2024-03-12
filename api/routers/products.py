from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Union, Optional

from queries.product_database import (
    Error,
    ProductRepository,
    ProductIn,
    ProductOut,
)

router = APIRouter(tags=["Products"], prefix="/api/products")


@router.post("/",
             response_model=Union[ProductOut, Error],
             tags=["Products"])
def create_products(product: ProductIn, repo: ProductRepository = Depends()):
    return repo.create(product)


@router.get("/",
            response_model=Union[List[ProductOut], Error],
            tags=["Products"])
def get_all(
    repo: ProductRepository = Depends()
):
    return repo.get_all()


@router.put("/{products_id}",
            response_model=Union[ProductOut, Error],
            tags=["Products"])
def update_product(
    products_id: int,
    product: ProductIn,
    repo: ProductRepository = Depends(),
) -> Union[Error, ProductOut]:
    return repo.update(products_id, product)


@router.delete("/{products_id}",
               response_model=bool,
               tags=["Products"])
def delete_product(
    products_id: int,
    repo: ProductRepository = Depends(),
) -> bool:
    return repo.delete(products_id)


@router.get("/{products_id}",
            response_model=Optional[ProductOut],
            tags=["Products"])
def get_product(
    products_id: int,
    response: Response,
    repo: ProductRepository = Depends(),
) -> ProductOut:
    product = repo.get_one(products_id)
    if product is None:
        response.status_code = 404
    return product


@router.put(
    "/{products_id}/set-stock-alert/{value}",
    response_model=bool,
    tags=["Products"],
)
def set_stock_alert(
    product_id: int, value: bool, repo: ProductRepository = Depends()
) -> bool:
    success = repo.set_stock_alert(product_id, value)
    if not success:
        raise HTTPException(status_code=404, detail="Product not found")
    return success


@router.get(
    "/{products_id}/get-stock-alert", response_model=bool, tags=["Products"]
)
def get_stock_alert(
    product_id: int, repo: ProductRepository = Depends()
) -> bool:
    stock_alert = repo.get_stock_alert(product_id)
    if stock_alert is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return stock_alert
