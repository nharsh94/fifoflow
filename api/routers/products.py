from fastapi import APIRouter, Depends, Response, HTTPException
from queries.product_database import ProductRepository
from typing import List, Union, Optional
from models.products import ProductIn, ProductOut, Error

router = APIRouter(tags=["Products"], prefix="/api/products")


@router.post("/", response_model=Union[ProductOut, Error])
def create_products(product: ProductIn, repo: ProductRepository = Depends()):
    return repo.create(product)


@router.get("/", response_model=Union[List[ProductOut], Error])
def get_all(repo: ProductRepository = Depends()):
    return repo.get_all()


@router.put("/{product_id}", response_model=Union[ProductOut, Error])
def update_product(
    product_id: int, product: ProductIn, repo: ProductRepository = Depends()
) -> Union[ProductOut, Error]:
    return repo.update(product_id, product)


@router.delete("/{product_id}", response_model=bool)
def delete_product(
    product_id: int, repo: ProductRepository = Depends()
) -> bool:
    if not repo.delete(product_id):
        raise HTTPException(
            status_code=404,
            detail="Product not found",
        )
    return True


@router.get("/{product_id}", response_model=Optional[ProductOut])
def get_one_product(
    product_id: int, response: Response, repo: ProductRepository = Depends()
) -> ProductOut:
    product = repo.get_one(product_id)
    if product is None:
        response.status_code = 404
        return None
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
