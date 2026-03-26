# Builder stage
FROM python:3.14.3 AS builder

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Create virtual environment
RUN python -m venv .venv

# Copy and install dependencies
COPY requirements.txt ./
RUN .venv/bin/pip install --upgrade pip
RUN .venv/bin/pip install -r requirements.txt

# Final stage
FROM python:3.14.3-slim

WORKDIR /app

# Copy virtualenv from builder
COPY --from=builder /app/.venv .venv/

# Copy app source code
COPY . .

# Run Uvicorn pointing to app.py
CMD ["/app/.venv/bin/uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]