from fastapi import APIRouter, Depends, Response
from queries.product_database import ProductRepository
from typing import List, Union, Optional
import models.products as pro

router = APIRouter()


@router.post("/products",
             response_model=Union[pro.ProductOut, pro.Error],
             tags=["Products"])
def create_products(
    product: pro.ProductIn,
    response: Response,
    repo: ProductRepository = Depends()
):
    response.status_code = 400
    return repo.create(product)


@router.get("/products",
            response_model=Union[List[pro.ProductOut], pro.Error],
            tags=["Products"])
def get_all(repo: ProductRepository = Depends()):
    return repo.get_all()


@router.put("/products/{product_id}",
            response_model=Union[pro.ProductOut, pro.Error],
            tags=["Products"])
def update_product(product_id: int,
                   product: pro.ProductIn,
                   repo: ProductRepository = Depends()
                   ) -> Union[pro.ProductOut, pro.Error]:
    return repo.update(product_id, product)


@router.delete("/products/{product_id}",
               response_model=bool, tags=["Products"])
def delete_product(product_id: int,
                   repo: ProductRepository = Depends()) -> bool:
    return repo.delete(product_id)


@router.get("/products/{product_id}",
            response_model=Optional[pro.ProductOut],
            tags=["Products"])
def get_one_product(product_id: int,
                    response: Response,
                    repo: ProductRepository = Depends()) -> pro.ProductOut:
    product = repo.get_one(product_id)
    if product in None:
        response.status_code = 404
    return product


@router.patch("/products/{product_id}",
              response_model=Union[pro.ProductOut, pro.Error],
              tags=["Products"])
def pratial_update_product(product_id: int,
                           product: pro.ProductIn,
                           repo: ProductRepository = Depends()
                           ) -> Union[pro.ProductOut, pro.Error]:
    return repo.partial_update(
        product_id,
        product
    )
