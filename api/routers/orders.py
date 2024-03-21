from fastapi import APIRouter, Depends, Response
from queries.orders_database import OrdersRepository
from typing import List, Union, Optional
from models.orders import (
    OrdersIn,
    OrdersOut,
    Error,
)

router = APIRouter(prefix="/api")


@router.post(
    "/orders", response_model=Union[OrdersOut, Error], tags=["Orders"]
)
def create_order(
    order: OrdersIn,
    repo: OrdersRepository = Depends(),
):
    return repo.create_order(order)


@router.get(
    "/orders", response_model=Union[List[OrdersOut], Error], tags=["Orders"]
)
def get_all_orders(
    repo: OrdersRepository = Depends(),
):
    return repo.get_all_orders()


@router.put(
    "/orders/{order_id}",
    response_model=Union[OrdersOut, Error],
    tags=["Orders"],
)
def update_orders(
    order_id: int,
    order: OrdersIn,
    repo: OrdersRepository = Depends(),
) -> Union[OrdersOut, Error]:
    return repo.update_order(order_id, order)


@router.delete("/orders/{order_id}", response_model=bool, tags=["Orders"])
def delete_order(
    order_id: int,
    repo: OrdersRepository = Depends(),
) -> bool:
    return repo.delete_order(order_id)


@router.get(
    "/orders/{order_id}", response_model=Optional[OrdersOut], tags=["Orders"]
)
def get_one_order(
    order_id: int,
    response: Response,
    repo: OrdersRepository = Depends(),
) -> OrdersOut:
    order = repo.get_one_order(order_id)
    if order is None:
        response.status_code = 404
    return order
