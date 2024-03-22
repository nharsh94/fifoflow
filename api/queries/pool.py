from psycopg_pool import ConnectionPool

pool = ConnectionPool(
    "postgresql://packit:packit@nov-2023-7db-service"
    ".default.svc.cluster.local/postgres"
)


# import os
# from psycopg_pool import ConnectionPool


# def get_database_url():
#     """
#     Get the appropriate database URL based on the environment.
#     """
#     environment = os.environ.get("ENVIRONMENT")
#     if environment == "localhost":

#         return os.environ.get("DATABASE_URL")
#     else:
#         # Use server database URL
#         return (
#             "postgresql://packit:packit@nov-2023-7db-service"
#             ".default.svc.cluster.local/postgres"
#         )


# # Create a connection pool using the appropriate database URL
# pool = ConnectionPool(conninfo=get_database_url())
