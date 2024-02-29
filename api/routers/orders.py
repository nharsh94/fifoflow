from fastapi import APIRouter
from models.orders import OrderItemsIn, OrdersIn

router = APIRouter()


@router.post("/order-items")
def create_order_item(order_item: OrderItemsIn):
    pass
