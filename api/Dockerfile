import os
FROM python:3.10-bullseye
RUN python -m pip install --upgrade pip
WORKDIR /app

# Copy the top-level files in your service's directory
COPY requirements.txt requirements.txt
COPY main.py main.py
COPY authenticator.py authenticator.py
COPY models.py models.py
COPY queries queries
COPY routers routers
COPY utils utils

# Install Python dependencies
RUN python -m pip install -r requirements.txt

# Copy the migrations directory for database migrations
COPY migrations migrations

# Run database migrations and start the FastAPI server
CMD python -m migrations up && uvicorn main:app --host 0.0.0.0 --port 80 --forwarded-allow-ips "*"
