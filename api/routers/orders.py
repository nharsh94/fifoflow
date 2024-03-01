from fastapi import APIRouter, Depends, Response
from queries.orders_queries import OrderItemsRepository, OrdersRepository
from typing import List, Union, Optional
from models.orders import OrderItemsIn, OrderItemsOut, OrdersIn, OrdersOut

router = APIRouter(tags=["Orders"], prefix="/api")


@router.post("/orders")
def create_order_item(order_item: OrderItemsIn):
    pass
