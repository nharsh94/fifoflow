from fastapi.testclient import TestClient
from main import app
from models.products import ProductOut, ProductIn
from queries.product_database import ProductRepository


client = TestClient(app)


class ProductsQuieres:
    def get_all(self):
        return [
            ProductOut(
                product_id=1,
                name="string",
                description="string",
                price=0,
                quantity_in_stock=0,
                category="string",
                supplier_id=5,
                alert_threshold=0,
                deleted_flag=False,
            ),
            ProductOut(
                product_id=2,
                name="string2",
                description="string2",
                price=10.99,
                quantity_in_stock=100,
                category="string2",
                supplier_id=6,
                alert_threshold=5,
                deleted_flag=False,
            ),
        ]

    def get_one(self, product_id: int):
        products = self.get_all()
        for product in products:
            if product.product_id == product_id:
                return product
        return None


class CreateQuieres:
    def create(self, product: ProductIn):
        result = {
            "product_id": 1,
            "name": "string",
            "description": "string",
            "price": 0,
            "quantity_in_stock": 0,
            "category": "string",
            "supplier_id": 5,
            "alert_threshold": 0,
            "deleted_flag": False,
        }
        result.update(product)
        return result


class UpdateQuieres:
    def update(self, product_id, product: ProductIn):
        result = {
            "product_id": product_id,
            "name": product.name,
            "description": product.description,
            "price": product.price,
            "quantity_in_stock": product.quantity_in_stock,
            "category": product.category,
            "supplier_id": product.supplier_id,
            "alert_threshold": product.alert_threshold,
            "deleted_flag": product.deleted_flag,
        }
        return result


class DeleteQuieres:
    def delete(self, product_id: int):
        return True


def test_get_all_products():
    app.dependency_overrides[ProductRepository] = ProductsQuieres

    response = client.get("/api/products/")
    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == [
        {
            "product_id": 1,
            "name": "string",
            "description": "string",
            "price": 0,
            "quantity_in_stock": 0,
            "category": "string",
            "supplier_id": 5,
            "alert_threshold": 0,
            "deleted_flag": False,
        },
        {
            "product_id": 2,
            "name": "string2",
            "description": "string2",
            "price": 10.99,
            "quantity_in_stock": 100,
            "category": "string2",
            "supplier_id": 6,
            "alert_threshold": 5,
            "deleted_flag": False,
        },
    ]


def test_create_product():
    app.dependency_overrides[ProductRepository] = CreateQuieres

    product = {
        "name": "string",
        "description": "string",
        "price": 0,
        "quantity_in_stock": 0,
        "category": "string",
        "supplier_id": 5,
        "alert_threshold": 0,
        "deleted_flag": False,
    }

    expected = {
        "product_id": 1,
        "name": "string",
        "description": "string",
        "price": 0,
        "quantity_in_stock": 0,
        "category": "string",
        "supplier_id": 5,
        "alert_threshold": 0,
        "deleted_flag": False,
    }

    response = client.post("/api/products/", json=product)

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected


def test_update_product():

    app.dependency_overrides[ProductRepository] = UpdateQuieres

    product_id = 1
    product = {
        "name": "string",
        "description": "string",
        "price": 0,
        "quantity_in_stock": 0,
        "category": "string",
        "supplier_id": 5,
        "alert_threshold": 0,
        "deleted_flag": False,
    }

    expected = {
        "product_id": 1,
        "name": "string",
        "description": "string",
        "price": 0,
        "quantity_in_stock": 0,
        "category": "string",
        "supplier_id": 5,
        "alert_threshold": 0,
        "deleted_flag": False,
    }

    response = client.put(f"/api/products/{product_id}", json=product)

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected


def test_get_one_product():
    app.dependency_overrides[ProductRepository] = ProductsQuieres

    product_id = 1

    expected_product = {
        "product_id": 1,
        "name": "string",
        "description": "string",
        "price": 0,
        "quantity_in_stock": 0,
        "category": "string",
        "supplier_id": 5,
        "alert_threshold": 0,
        "deleted_flag": False,
    }

    response = client.get(f"/api/products/{product_id}")

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected_product


def test_delete_product():
    app.dependency_overrides[ProductRepository] = DeleteQuieres

    product_id = 1

    response = client.delete(f"/api/products/{product_id}")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == True
