from typing import List, Optional, Union
from queries.pool import pool
from models.profiles import ProfileOut, ProfileIn, Error


class ProfileRepository:

    def get_one(self, user_id: int) -> Optional[ProfileOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM profiles
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    profile = db.fetchone()
                    if not profile:
                        return None
                    return self.record_to_profile_out(profile)
        except Exception:
            return {"message": "Product ID does not exist"}

    def delete(self, user_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM profiles
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception:
            return False

    def update(
            self,
            user_id: int,
            profile: ProfileIn
            ) -> Union[List[ProfileOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE profiles
                        SET
                            user_id = %s
                            , role = %s
                            , first_name = %s
                            , last_name = %s
                            , email = %s
                            , phone = %s
                        WHERE user_id = %s
                        RETURNING *
                        """,
                        [
                            profile.user_id,
                            profile.role,
                            profile.first_name,
                            profile.last_name,
                            profile.email,
                            profile.phone,
                            user_id
                        ]
                    )
                    return self.profile_in_to_out(user_id, profile)
        except Exception:
            return {"message": "Could not update profile"}

    def get_all(self) -> Union[List[ProfileOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM profiles
                        ORDER BY user_id
                        """
                    )
                    return [
                        self.record_to_profile_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Could not get all profiles"}

    def create(self, profile: ProfileIn) -> ProfileOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO profiles
                        (
                        user_id,
                        role,
                        first_name,
                        last_name,
                        email,
                        phone
                        )
                        VALUES
                        (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            profile.user_id,
                            profile.role,
                            profile.first_name,
                            profile.last_name,
                            profile.email,
                            profile.phone
                        ]
                    )
                    inserted_id = db.fetchone()[0]
                    return self.profile_in_to_out(inserted_id, profile)
        except Exception:
            return {"message": "Profile faild to create"}

    def profile_in_to_out(self, id: int, profile: ProfileIn
                          ) -> ProfileOut:
        old_data = profile.dict()
        return ProfileOut(id=id, **old_data)

    def record_to_profile_out(self, record):
        return ProfileOut(
            id=record[0],
            user_id=record[1],
            role=record[2],
            first_name=record[3],
            last_name=record[4],
            email=record[5],
            phone=record[6]
        )
