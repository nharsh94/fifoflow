from fastapi import APIRouter, Depends, Response
from queries.product_database import (ProductIn,
                                      ProductRepository,
                                      ProductOut,
                                      Error)
from typing import List, Union, Optional

router = APIRouter()


@router.post("/products",
             response_model=Union[ProductOut, Error],
             tags=["Products"])
def create_products(
    product: ProductIn,
    response: Response,
    repo: ProductRepository = Depends()
):
    response.status_code = 400
    return repo.create(product)


@router.get("/products",
            response_model=Union[List[ProductOut], Error],
            tags=["Products"])
def get_all(repo: ProductRepository = Depends()):
    return repo.get_all()


@router.put("products/{product_id}",
            response_model=Union[ProductOut, Error],
            tags=["Products"])
def update_product(product_id: int,
                   product: ProductIn,
                   repo: ProductRepository = Depends()) -> Union[Error,
                                                                 ProductOut]:
    return repo.update(product_id, product)


@router.delete("products/{product_id}", response_model=bool, tags=["Products"])
def delete_product(product_id: int,
                   repo: ProductRepository = Depends()) -> bool:
    return repo.delete(product_id)


@router.get("products/{product_id}",
            response_model=Optional[ProductOut],
            tags=["Products"])
def get_one_product(product_id: int,
                    response: Response,
                    repo: ProductRepository = Depends()) -> ProductOut:
    product = repo.get_one(product_id)
    if product in None:
        response.status_code = 404
    return product


@router.patch("products/{product_id}",
              response_model=Union[ProductOut, Error],
              tags=["Products"])
def pratial_update_product(product_id: int,
                           product: ProductIn,
                           repo: ProductRepository = Depends()
                           ) -> Union[Error, ProductOut]:
    return repo.partial_update(
        product_id,
        product
    )
