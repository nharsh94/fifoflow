from main import app
from fastapi.testclient import TestClient
from queries.orders_database import OrdersRepository
from datetime import datetime

client = TestClient(app)
timestamp = str(datetime.now())


class EmptyOrderQueries:
    def get_all_orders(self):
        return []


class GetOrderQueries:
    def get_all_orders(self):
        result = [
            {
                "order_id": 1,
                "shop_id": 1,
                "user_id": 1,
                "order_date": "2024-03-20T21:26:29.950466",
                "product_id": 1,
                "quantity": 12,
                "total_price": "0.00",
                "status": "submitted",
            },
            {
                "order_id": 4,
                "shop_id": 7,
                "user_id": 26,
                "order_date": "2024-05-20T21:26:29.950466",
                "product_id": 149,
                "quantity": 10,
                "total_price": "0.00",
                "status": "submitted",
            },
        ]
        return result


class CreateOrderQueries:
    def create_order(self, order):
        result = {
            "order_id": 1,
            "shop_id": 1,
            "user_id": 1,
            "product_id": 1,
            "quantity": 1,
            "total_price": "10.00",
            "status": "submitted",
            "order_date": "2024-03-20T21:26:29.950466",
        }
        result.update(order)
        return result


def test_get_all_orders_none():
    app.dependency_overrides[OrdersRepository] = EmptyOrderQueries
    response = client.get("/api/orders")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []


def test_get_all_orders_multiple():
    app.dependency_overrides[OrdersRepository] = GetOrderQueries
    response = client.get("/api/orders")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == [
        {
            "order_id": 1,
            "shop_id": 1,
            "user_id": 1,
            "order_date": "2024-03-20T21:26:29.950466",
            "product_id": 1,
            "quantity": 12,
            "total_price": 0.0,
            "status": "submitted",
        },
        {
            "order_id": 4,
            "shop_id": 7,
            "user_id": 26,
            "order_date": "2024-05-20T21:26:29.950466",
            "product_id": 149,
            "quantity": 10,
            "total_price": 0.0,
            "status": "submitted",
        },
    ]


def test_create_order():
    app.dependency_overrides[OrdersRepository] = CreateOrderQueries
    order = {
        "shop_id": 1,
        "user_id": 1,
        "product_id": 1,
        "quantity": 1,
        "total_price": "10.00",
        "status": "submitted",
        "order_date": "2024-03-20T21:26:29.950466",
    }
    response = client.post("/api/orders", json=order)
    app.dependency_overrides = {}
<<<<<<< HEAD
    print(response.json())
=======
>>>>>>> 19e193e0f2d357e5bb364a4455c5e926d8f18ed8
    assert response.status_code == 200
    assert response.json() == {
        "order_id": 1,
        "shop_id": 1,
        "user_id": 1,
        "product_id": 1,
        "quantity": 1,
        "total_price": 10.0,
        "status": "submitted",
        "order_date": "2024-03-20T21:26:29.950466",
    }
