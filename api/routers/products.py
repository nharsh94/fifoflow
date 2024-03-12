from fastapi import APIRouter, Depends, Response
from queries.product_database import ProductRepository
from typing import List, Union, Optional
from models.products import ProductIn, ProductOut, Error

router = APIRouter(tags=["Products"], prefix="/api/products")


@router.post("/", response_model=Union[ProductOut, Error])
def create_products(
    product: ProductIn,
    repo: ProductRepository = Depends()
):
    return repo.create(product)


@router.get("/", response_model=Union[List[ProductOut], Error])
def get_all(repo: ProductRepository = Depends()):
    return repo.get_all()


@router.put("/{product_id}",
            response_model=Union[ProductOut, Error])
def update_product(product_id: int,
                   product: ProductIn,
                   repo: ProductRepository = Depends()
                   ) -> Union[ProductOut, Error]:
    return repo.update(product_id, product)


@router.delete("/{product_id}", response_model=bool)
def delete_product(product_id: int,
                   repo: ProductRepository = Depends()) -> bool:
    return repo.delete(product_id)


@router.get("/{product_id}", response_model=Optional[ProductOut])
def get_one_product(product_id: int,
                    response: Response,
                    repo: ProductRepository = Depends()) -> ProductOut:
    product = repo.get_one(product_id)
    if product is None:
        response.status_code = 404
    return product
