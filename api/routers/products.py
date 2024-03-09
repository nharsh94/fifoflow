from fastapi import APIRouter, Depends, Response, HTTPException
from queries.product_database import ProductRepository
from typing import List, Optional
import models.products as pro

router = APIRouter(tags=["Products"], prefix="/api/products")


@router.post("/", response_model=pro.ProductOut, status_code=201)
def create_products(
    product: pro.ProductIn, repo: ProductRepository = Depends()
):
    created_product = repo.create(product)
    if created_product is None:
        raise HTTPException(
            status_code=400, detail="Product could not be created"
        )
    return created_product


@router.get("/", response_model=List[pro.ProductOut])
def get_all(repo: ProductRepository = Depends()) -> List[pro.ProductOut]:
    return repo.get_all()


@router.put("/{product_id}", response_model=pro.ProductOut)
def update_product(
    product_id: int,
    product: pro.ProductIn,
    repo: ProductRepository = Depends(),
) -> pro.ProductOut:
    updated_product = repo.update(product_id, product)
    if updated_product is None:
        raise HTTPException(
            status_code=404, detail=f"Product with ID {product_id} not found"
        )
    return updated_product


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


@router.get("/{product_id}", response_model=Optional[pro.ProductOut])
def get_one_product(
    product_id: int, response: Response, repo: ProductRepository = Depends()
) -> Optional[pro.ProductOut]:
    product = repo.get_one(product_id)
    if product is None:
        response.status_code = 404
        return None
    return product
