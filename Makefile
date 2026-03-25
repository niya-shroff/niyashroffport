.PHONY: install install-frontend install-backend dev-frontend dev-backend build-frontend prod-backend clean

# Install all dependencies
install: install-frontend install-backend

install-frontend:
	cd frontend && npm install

install-backend:
	cd backend && . .venv/bin/activate && pip install -r requirements.txt

# Run development servers together
start_app:
	# Run backend in background and frontend in foreground
	cd backend && . .venv/bin/activate && uvicorn app:app --host 127.0.0.1 --port 8000 --reload

dev-frontend:
	cd frontend && npm run dev

dev-backend:
	cd backend && . .venv/bin/activate && uvicorn app:app --host 127.0.0.1 --port 8000 --reload

# Build and Production setup
build-frontend:
	cd frontend && npm run build

# Start backend for production with Hypercorn
prod-backend:
	cd backend && . .venv/bin/activate && hypercorn app:app --bind 0.0.0.0:8000

# Optional: Clean up build artifacts
clean:
	rm -rf frontend/dist
	rm -rf frontend/node_modules
	rm -rf backend/__pycache__
