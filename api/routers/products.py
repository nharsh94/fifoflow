from fastapi import APIRouter, Depends, Response
from queries.product_database import ProductIn, ProductRepository, ProductOut,Error
from typing import Union

router = APIRouter()

@router.post("/products", response_model = Union[ProductOut, Error])
def create_products(product: ProductIn, response : Response, repo: ProductRepository = Depends()):
    response.status_code = 400
    return repo.create(product)
