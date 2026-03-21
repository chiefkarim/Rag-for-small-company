import sys
import os
from http.server import BaseHTTPRequestHandler, HTTPServer
import redis
from rq import Worker, Queue

# Use the REDIS_URL from environment or default
REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")
PORT = int(os.environ.get("PORT", 8080))

class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path in ("/", "/health"):
            try:
                # Connect to Redis
                conn = redis.from_url(REDIS_URL)
                
                # Check for workers listening on the 'embeddings' queue
                # We consider the service healthy if at least one worker is alive
                workers = Worker.all(connection=conn)
                embeddings_workers = [
                    w for w in workers 
                    if "embeddings" in w.queue_names() and w.get_state() != "stopped"
                ]
                
                if embeddings_workers:
                    self.send_response(200)
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    status_data = {
                        "status": "healthy", 
                        "worker_count": len(embeddings_workers),
                        "workers": [w.name for w in embeddings_workers]
                    }
                    import json
                    self.wfile.write(json.dumps(status_data).encode())
                else:
                    self.send_response(503) # Service Unavailable
                    self.send_header("Content-type", "application/json")
                    self.end_headers()
                    self.wfile.write(b'{"status": "unhealthy", "reason": "no active workers on embeddings queue"}')
            
            except Exception as e:
                self.send_response(500)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(f'{{"status": "error", "reason": "{str(e)}"}}'.encode())
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        return

def run_health_server():
    server = HTTPServer(("0.0.0.0", PORT), HealthHandler)
    print(f"Health check server started on port {PORT}")
    server.serve_forever()

if __name__ == "__main__":
    run_health_server()
