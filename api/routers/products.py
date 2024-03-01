from fastapi import APIRouter, Depends, Response
from queries.product_database import ProductRepository
from typing import List, Union, Optional
import models.products as pro

router = APIRouter(tags=["Products"], prefix="/api/products")


@router.post("/", response_model=Union[pro.ProductOut, pro.Error])
def create_products(
    product: pro.ProductIn,
    response: Response,
    repo: ProductRepository = Depends()
):
    response.status_code = 400
    return repo.create(product)


@router.get("/", response_model=Union[List[pro.ProductOut], pro.Error])
def get_all(repo: ProductRepository = Depends()):
    return repo.get_all()


@router.put("/{product_id}",
            response_model=Union[pro.ProductOut, pro.Error])
def update_product(product_id: int,
                   product: pro.ProductIn,
                   repo: ProductRepository = Depends()
                   ) -> Union[pro.ProductOut, pro.Error]:
    return repo.update(product_id, product)


@router.delete("/{product_id}", response_model=bool)
def delete_product(product_id: int,
                   repo: ProductRepository = Depends()) -> bool:
    return repo.delete(product_id)


@router.get("/{product_id}", response_model=Optional[pro.ProductOut])
def get_one_product(product_id: int,
                    response: Response,
                    repo: ProductRepository = Depends()) -> pro.ProductOut:
    product = repo.get_one(product_id)
    if product in None:
        response.status_code = 404
    return product
