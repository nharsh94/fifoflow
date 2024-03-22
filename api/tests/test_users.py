import unittest
from queries.user_database import UserQueries
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestUserQueries(unittest.TestCase):
    def setUp(self):
        self.user_queries = UserQueries()

    def test_get_all_users(self):
        users = self.user_queries.get_all_users()
        self.assertIsInstance(users, list)

    def test_get_by_username_non_existing_user(self):
        username = "nonexistinguser"
        user = self.user_queries.get_by_username(username)
        self.assertIsNone(user)

    def test_get_by_id_non_existing_user(self):
        user_id = 9999
        user = self.user_queries.get_by_id(user_id)
        self.assertIsNone(user)


if __name__ == "__main__":
    unittest.main()
