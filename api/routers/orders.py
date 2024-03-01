from fastapi import APIRouter, Depends, Response
from queries.orders_queries import OrderItemsRepository, OrdersRepository
from typing import List, Union, Optional
from models.orders import (
    OrderItemsIn, OrderItemsOut,
    OrdersIn, OrdersOut, Error
)

router = APIRouter(tags=["Orders"], prefix="/api")


@router.post("/orders", response_model=Union[OrdersOut, Error])
def create_order(
    order: OrdersIn,
    response: Response,
    repo: OrdersRepository = Depends(),
):
    response.status_code = 400
    return repo.create_order(order)


@router.get("/orders", response_model=Union[List[OrdersOut], Error])
def get_all_orders(
    repo: OrdersRepository = Depends(),
):
    return repo.get_all_orders()


@router.put("/orders/{order_id}", response_model=Union[OrdersOut, Error])
def update_orders(
    order_id: int,
    order: OrdersIn,
    repo: OrdersRepository = Depends(),
) -> Union[Error, OrdersOut]:
    return repo.update_order(order_id, order)


@router.delete("/orders/{order_id}", response_model=bool)
def delete_order(
    order_id: int,
    repo: OrdersRepository = Depends(),
) -> bool:
    return repo.delete_order(order_id)


@router.get("/orders/{order_id}", response_model=Optional[OrdersOut])
def get_one_order(
    order_id: int,
    response: Response,
    repo: OrdersRepository = Depends(),
) -> OrdersOut:
    order = repo.get_one_order(order_id)
    if order is None:
        response.status_code = 404
    return order


@router.post("/order-items", response_model=Union[OrderItemsOut, Error])
def create_order_item(
    order_item: OrderItemsIn,
    response: Response,
    repo: OrderItemsRepository = Depends(),
):
    response.status_code = 400
    return repo.create_order_item(order_item)


@router.get("/order-items", response_model=Union[List[OrderItemsOut], Error])
def get_all_order_items(
    repo: OrderItemsRepository = Depends(),
):
    return repo.get_all_order_items()


@router.put("/orders-items/{id}", response_model=Union[OrdersOut, Error])
def update_order_items(
    id: int,
    order_item: OrderItemsIn,
    repo: OrderItemsRepository = Depends(),
) -> Union[Error, OrderItemsOut]:
    return repo.update_order_item(id, order_item)


@router.delete("/order-items/{id}", response_model=bool)
def delete_order_item(
    id: int,
    repo: OrderItemsRepository = Depends(),
) -> bool:
    return repo.delete_order_item(id)


@router.get("/order-items/{id}", response_model=Optional[OrderItemsOut])
def get_one_order_item(
    id: int,
    response: Response,
    repo: OrderItemsRepository = Depends(),
) -> OrderItemsOut:
    order = repo.get_one_order_item(id)
    if order is None:
        response.status_code = 404
    return order
