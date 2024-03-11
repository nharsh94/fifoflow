from typing import List, Optional, Union
from queries.pool import pool
import models.profiles as pro
import traceback


class ProfileRepository:

    def get_one(self, user_id: int) -> Optional[pro.ProfileOut]:
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
            traceback.print_exc()
            return None

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
        except Exception as e:
            print(e)
            return False

    def update(
            self,
            user_id: int,
            profile: pro.ProfileIn
            ) -> Union[List[pro.ProfileOut], pro.Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE profiles
                        SET name = %s
                            , user_id = %s
                            , role_id = %s
                            , first_name = %s
                            , last_name = %s
                            , email = %s
                            , phone = %s
                            , password = %s
                        WHERE id = %s
                        """,
                        [
                            profile.user_id,
                            profile.role_id,
                            profile.price,
                            profile.quantity_in_stock,
                            profile.category,
                            profile.supplier_id,
                            profile.alert_threshold,
                            id
                        ]
                    )
                    return self.profile_in_to_out(user_id, profile)
        except Exception as e:
            print(e)
            return {"message": "Could not update profile"}

    def get_all(self) -> Union[List[pro.ProfileOut], pro.Error]:
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
        except Exception as e:
            print(e)
            return {"message": "Could not get all profiles"}

    def create(self, profile: pro.ProfileIn) -> pro.ProfileOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO profiles
                        (
                        user_id,
                        role_id,
                        first_name,
                        last_name,
                        email,
                        phone,
                        password
                        )
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            profile.user_id,
                            profile.role_id,
                            profile.first_name,
                            profile.last_name,
                            profile.email,
                            profile.phone,
                            profile.password
                        ]
                    )
                inserted_id = db.fetchone()[0]
                return self.profile_in_to_out(inserted_id, profile)
        except Exception as e:
            traceback.print_exc()
            return {"message": str(e)}

    def profile_in_to_out(self, id: int, profile: pro.ProfileIn):
        old_data = profile.dict()
        return profile.ProfileOut(id=id, **old_data)

    def record_to_profile_out(self, record):
        return pro.ProfileOut(
            id=record[0],
            user_id=record[1],
            role_id=record[2],
            first_name=record[3],
            last_name=record[4],
            email=record[5],
            phone=record[6],
            password=record[7]
        )
