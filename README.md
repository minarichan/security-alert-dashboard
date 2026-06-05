# Security Alert Dashboard

A full-stack web dashboard for monitoring and visualizing security events. Built with FastAPI (Python) and React (TypeScript), with automated testing and deployment via GitHub Actions.

![Stack](https://img.shields.io/badge/Python-3.12-blue) ![Stack](https://img.shields.io/badge/FastAPI-0.115-green) ![Stack](https://img.shields.io/badge/React-19-61dafb) ![Stack](https://img.shields.io/badge/TypeScript-5.7-3178c6)

## Features

- Alert monitoring — Browse, filter and inspect security alerts by severity, status, and category
- System metrics — View key operational metrics (threats, blocked requests, patch compliance, etc.)
- Summary dashboard — At-a-glance counts, uptime, MTTA and severity distribution chart
- REST API — Documented FastAPI endpoints with OpenAPI at `/docs`
- Auto-refresh — Dashboard polls for updates every 30 seconds
- CI/CD — GitHub Actions for automated testing and build artifacts

## Project Structure

```
security-alert-dashboard/
├── backend/                 # FastAPI REST API
│   ├── app/
│   │   ├── main.py          # Application entry point
│   │   ├── models.py        # Pydantic schemas
│   │   ├── routes/          # API route handlers
│   │   └── data/sample.py   # Sample alert & metric data
│   └── tests/               # pytest test suite
├── frontend/                # React + Vite SPA
│   └── src/
│       ├── api/             # API client
│       └── components/      # Dashboard UI components
├── .github/workflows/       # CI and deploy pipelines
└── docs/architecture.md     # Architecture documentation
```

## Quick Start

### Prerequisites

- Python 3.12+
- Node.js 22+
- npm

### Backend

```bash
cd backend
python -m venv .venv

# Windows
.venv\Scripts\activate

# macOS/Linux
source .venv/bin/activate

pip install -r requirements.txt
cp .env.example .env   # optional — defaults work for local dev
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API available at http://127.0.0.1:8000 — docs at http://127.0.0.1:8000/docs

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local   # optional
npm run dev
```

Dashboard at http://localhost:5173 (proxies API requests to the backend).

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Health check |
| `GET /api/alerts` | List alerts (`?severity=`, `?status=`, `?category=`) |
| `GET /api/alerts/summary` | Alert counts by status and severity |
| `GET /api/alerts/{id}` | Single alert detail |
| `GET /api/metrics` | System metrics list |
| `GET /api/metrics/overview` | Metrics with uptime and MTTA |

## Testing

```bash
# Backend
cd backend && pytest -v

# Frontend
cd frontend && npm run lint && npm run build
```

## CI/CD

- CI (`.github/workflows/ci.yml`) — Runs backend tests and frontend build on every push/PR.
- Deploy (`.github/workflows/deploy.yml`) — Builds and uploads frontend artifacts on `main`; extend with your hosting target.

## Configuration

| Variable | Location | Default |
|----------|----------|---------|
| `CORS_ORIGINS` | `backend/.env` | `http://localhost:5173` |
| `VITE_API_BASE_URL` | `frontend/.env.local` | Empty (uses Vite proxy) |

## Documentation

See [docs/architecture.md](docs/architecture.md) for system design, security practices, and extension ideas.

## License

MIT
