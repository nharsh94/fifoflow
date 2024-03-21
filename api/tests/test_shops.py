from fastapi.testclient import TestClient
from main import app
from models.shops import ShopOut, ShopIn
from queries.shop_database import ShopRepository


client = TestClient(app)


class ShopsQuieres:
    def get_all(self):
        return [
            ShopOut(
                shop_id=1,
                shop_name="string",
                address="string",
                phone="string",
            ),
            ShopOut(
                shop_id=2,
                shop_name="string2",
                address="string2",
                phone="string2",
            ),
        ]

    def get_one(self, shop_id: int):
        shops = self.get_all()
        for shop in shops:
            if shop.shop_id == shop_id:
                return shop
        return None


class CreateQuieres:
    def create(self, shop: ShopIn):
        result = {
            "shop_id": 1,
            "shop_name": "string",
            "address": "string",
            "phone": "string",
        }
        result.update(shop)
        return result


class UpdateQuieres:
    def update(self, shop_id, shop: ShopIn):
        result = {
            "shop_id": shop_id,
            "shop_name": shop.shop_name,
            "address": shop.address,
            "phone": shop.phone,
        }
        return result


class DeleteQuieres:
    def delete(self, shop_id: int):
        return True


def test_get_all_shops():
    app.dependency_overrides[ShopRepository] = ShopsQuieres

    response = client.get("/api/shops/")
    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == [
        {
            "shop_id": 1,
            "shop_name": "string",
            "address": "string",
            "phone": "string",
        },
        {
            "shop_id": 2,
            "shop_name": "string2",
            "address": "string2",
            "phone": "string2",
        },
    ]


def test_create_shop():
    app.dependency_overrides[ShopRepository] = CreateQuieres

    shop = {
        "shop_name": "string",
        "address": "string",
        "phone": "string",
    }

    expected = {
        "shop_id": 1,
        "shop_name": "string",
        "address": "string",
        "phone": "string",
    }

    response = client.post("/api/shops/", json=shop)

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected


def test_update_shop():

    app.dependency_overrides[ShopRepository] = UpdateQuieres

    shop_id = 1
    shop = {
        "shop_name": "string",
        "address": "string",
        "phone": "string",
    }

    expected = {
        "shop_id": 1,
        "shop_name": "string",
        "address": "string",
        "phone": "string",
    }

    response = client.put(f"/api/shops/{shop_id}", json=shop)

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected


def test_get_one_shop():
    app.dependency_overrides[ShopRepository] = ShopsQuieres

    shop_id = 1

    expected_shop = {
        "shop_id": 1,
        "shop_name": "string",
        "address": "string",
        "phone": "string",
    }

    response = client.get(f"/api/shops/{shop_id}")

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected_shop


def test_delete_shop():
    app.dependency_overrides[ShopRepository] = DeleteQuieres

    shop_id = 1

    response = client.delete(f"/api/shops/{shop_id}")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() is True
