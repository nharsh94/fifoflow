from fastapi.testclient import TestClient
from main import app
from models.profiles import ProfileOut, ProfileIn
from queries.profile_database import ProfileRepository


client = TestClient(app)


class ProfileQuieres:
    def get_all(self):
        return [
            ProfileOut(
                id=1,
                user_id=1,
                role="Admin",
                first_name="string",
                last_name="string",
                email="string@example.com",
                phone="1234567890",
            ),
            ProfileOut(
                id=2,
                user_id=2,
                role="Supplier",
                first_name="string2",
                last_name="string2",
                email="string2@example.com",
                phone="0987654321",
            ),
        ]

    def get_one(self, user_id: int):
        profiles = self.get_all()
        for profile in profiles:
            if profile.user_id == user_id:
                return profile
        return None


class CreateQuieres:
    def create(self, profile: ProfileIn):
        result = {
            "id": 1,
            "user_id": 1,
            "role": "string",
            "first_name": "string",
            "last_name": "string",
            "email": "string@example.com",
            "phone": "1234567890",
        }
        result.update(profile)
        return result


class UpdateQuieres:
    def update(self, user_id, profile: ProfileIn):
        result = {
            "id": user_id,
            "user_id": user_id,
            "role": profile.role,
            "first_name": profile.first_name,
            "last_name": profile.last_name,
            "email": profile.email,
            "phone": profile.phone,
        }
        return result


class DeleteQuieres:
    def delete(self, user_id: int):
        return True


def test_get_all_profiles():
    app.dependency_overrides[ProfileRepository] = ProfileQuieres

    response = client.get("/api/profile/")

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == [
        {
            "id": 1,
            "user_id": 1,
            "role": "Admin",
            "first_name": "string",
            "last_name": "string",
            "email": "string@example.com",
            "phone": "1234567890",
        },
        {
            "id": 2,
            "user_id": 2,
            "role": "Supplier",
            "first_name": "string2",
            "last_name": "string2",
            "email": "string2@example.com",
            "phone": "0987654321",
        },
    ]


def test_create_profile():
    app.dependency_overrides[ProfileRepository] = CreateQuieres

    profile = {
        "user_id": 1,
        "role": "Admin",
        "first_name": "string",
        "last_name": "string",
        "email": "string@example.com",
        "phone": "1234567890",
    }

    expected = {
        "id": 1,
        "user_id": 1,
        "role": "Admin",
        "first_name": "string",
        "last_name": "string",
        "email": "string@example.com",
        "phone": "1234567890",
    }

    response = client.post("/api/profile/", json=profile)

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected


def test_update_profile():

    app.dependency_overrides[ProfileRepository] = UpdateQuieres

    user_id = 1
    profile = {
        "user_id": 1,
        "role": "Admin",
        "first_name": "string",
        "last_name": "string",
        "email": "string@example.com",
        "phone": "1234567890",
    }

    expected = {
        "id": 1,
        "user_id": 1,
        "role": "Admin",
        "first_name": "string",
        "last_name": "string",
        "email": "string@example.com",
        "phone": "1234567890",
    }

    response = client.put(f"/api/profile/{user_id}", json=profile)

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected


def test_get_one_profile():
    app.dependency_overrides[ProfileRepository] = ProfileQuieres

    user_id = 1

    expected_product = {
        "id": 1,
        "user_id": 1,
        "role": "Admin",
        "first_name": "string",
        "last_name": "string",
        "email": "string@example.com",
        "phone": "1234567890",
    }

    response = client.get(f"/api/profile/{user_id}")

    app.dependency_overrides = {}

    assert response.status_code == 200

    assert response.json() == expected_product


def test_delete_profile():
    app.dependency_overrides[ProfileRepository] = DeleteQuieres

    user_id = 1

    response = client.delete(f"/api/profile/{user_id}")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() is True
