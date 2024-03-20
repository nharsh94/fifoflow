from fastapi import APIRouter, Depends, HTTPException
from queries.product_database import ProductRepository
from typing import List, Union, Optional
from models.products import ProductIn, ProductOut, Error

router = APIRouter(tags=["Products"], prefix="/api/products")


@router.post("/", response_model=Union[ProductOut, Error])
def create_products(product: ProductIn, repo: ProductRepository = Depends()):
    if product.supplier_id == 0:
        raise HTTPException(status_code=400, detail="Invalid supplier ID")
    return repo.create(product)


@router.get("/", response_model=Union[List[ProductOut], Error])
def get_all(repo: ProductRepository = Depends()):
    products = repo.get_all()
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    return products


@router.put("/{product_id}", response_model=Union[ProductOut, Error])
def update_product(
    product_id: int, product: ProductIn, repo: ProductRepository = Depends()
) -> Union[ProductOut, Error]:
    if product.supplier_id == 0:
        raise HTTPException(status_code=400, detail="Invalid supplier ID")
    return repo.update(product_id, product)


@router.delete("/{product_id}", response_model=bool)
def delete_product(
    product_id: int, repo: ProductRepository = Depends()
) -> bool:
    return repo.delete(product_id)


@router.get("/{product_id}", response_model=Optional[ProductOut])
def get_one_product(
    product_id: int, repo: ProductRepository = Depends()
) -> ProductOut:
    product = repo.get_one(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="No products matching ID")
    return product
