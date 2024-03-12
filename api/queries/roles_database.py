from typing import List, Optional, Union
from queries.pool import pool
from models.roles import RoleOut, RoleIn, Error
import traceback


class RoleRepository:

    def get_one(self, role_id: int) -> Optional[RoleOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT *
                        FROM roles
                        WHERE role_id = %s
                        """,
                        [role_id]
                    )
                    role = db.fetchone()
                    if not role:
                        return None
                    return self.record_to_role_out(role)
        except Exception:
            traceback.print_exc()
            return None

    def delete(self, role_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM roles
                        WHERE role_id = %s
                        """,
                        [role_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def update(
            self,
            role_id: int,
            role: RoleIn
            ) -> Union[List[RoleOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE roles
                        SET
                            role_name = %s
                        WHERE role_id = %s
                        """,
                        [
                            role.role_name,
                            role_id
                        ]
                    )
                    return self.role_in_to_out(role_id, role)
        except Exception as e:
            print(e)
            return {"message": "Could not update role"}

    def get_all(self) -> Union[List[RoleOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM roles
                        ORDER BY role_id
                        """
                    )
                    return [
                        self.record_to_role_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return {"message": "Could not get all roles"}

    def create(self, role: RoleIn) -> RoleOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO roles
                        (
                        role_name
                        )
                        VALUES
                        (%s)
                        RETURNING role_id;
                        """,
                        [
                            role.role_name
                        ]
                    )
                    inserted_id = db.fetchone()[0]
                    return self.role_in_to_out(inserted_id, role)
        except Exception as e:
            traceback.print_exc()
            return {"message": str(e)}

    def role_in_to_out(self, role_id: int, role: RoleIn) -> RoleOut:
        old_data = role.dict()
        return RoleOut(role_id=role_id, **old_data)

    def record_to_role_out(self, record):
        return RoleOut(
            role_id=record[0],
            role_name=record[1]
        )
