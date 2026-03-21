#!/bin/bash

# Start the health check server in the background
echo "Starting health check server..."
python scripts/health_check.py &

# Start the RQ worker in the foreground
# This allows it to own the main thread and handle signals correctly
echo "Starting RQ worker..."
exec uv run scripts/worker.py
