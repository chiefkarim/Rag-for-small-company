# --- Stage 1: Build ---
# Use official Python image from Docker Hub (usually more reliable than GHCR for some networks)
FROM python:3.13-slim-bookworm AS builder

# Install uv binary from the official image
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uv /bin/uv

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# OPTIMIZATION: Use copy mode since hardlinks don't work across Docker cache mounts
ENV UV_LINK_MODE=copy
# CRITICAL: Prevent uv from downloading a different Python version and wiping the venv.
ENV UV_PYTHON=python3.13
ENV UV_PYTHON_PREFERENCE=only-system

# OPTIMIZATION: Increase timeout for slow networks
ENV UV_HTTP_TIMEOUT=300

# Copy dependency files
COPY pyproject.toml uv.lock ./

# Step 1: Install dependencies ONLY (Heaviest step, cached by Docker)
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-install-project --no-dev

# Step 2: Copy the application code
COPY . .

# Step 3: Sync the project itself (Fast check)
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev


# --- Stage 2: Final Production Image ---
FROM python:3.13-slim-bookworm

# Install uv binary
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uv /bin/uv

# Install necessary system libraries for OpenCV and OCR (docling) to run on a slim image
RUN apt-get update && apt-get install -y --no-install-recommends \
    libglib2.0-0 \
    libgl1 \
    libxcb1 \
    libxext6 \
    libsm6 \
    libxrender1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Inherit settings from builder
ENV UV_PYTHON=python3.13
ENV UV_PYTHON_PREFERENCE=only-system

# Copy the virtual environment and metadata from the builder
COPY --from=builder /app/.venv /app/.venv
COPY --from=builder /app/uv.lock /app/uv.lock
COPY --from=builder /app/pyproject.toml /app/pyproject.toml

# Copy project files
COPY . .

# Ensure the sqlite database directory exists directly in the container
RUN mkdir -p infrastructure/databases/sqlite

# Set runtime paths
ENV PATH="/app/.venv/bin:$PATH"
ENV PORT=8000
ENV PYTHONUNBUFFERED=1

# Run the app
ENTRYPOINT ["uv", "run"]
CMD ["fastapi", "run", "main.py", "--host", "0.0.0.0", "--port", "8000"]
