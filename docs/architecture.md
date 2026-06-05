# Architecture

## Overview

The Security Alert Dashboard is a full-stack web application for monitoring and visualizing security events. It follows a classic client–server architecture with a React SPA consuming a FastAPI REST API.

```
┌─────────────────┐         HTTP/JSON          ┌─────────────────┐
│  React Frontend │  ◄──────────────────────►  │  FastAPI Backend │
│  (Vite, TS)     │         /api/*             │  (Python)        │
└─────────────────┘                            └─────────────────┘
        │                                                │
        │  Static assets (production)                    │  Sample in-memory data
        ▼                                                ▼
   CDN / Web server                                  Future: DB / SIEM
```

## Components

### Backend (`backend/`)

| Module | Responsibility |
|--------|----------------|
| `app/main.py` | FastAPI app, CORS middleware, route registration |
| `app/config.py` | Environment-driven settings (origins, API prefix) |
| `app/models.py` | Pydantic schemas for alerts and metrics |
| `app/routes/alerts.py` | Alert listing, filtering, summary, detail |
| `app/routes/metrics.py` | System metrics and overview |
| `app/data/sample.py` | Seed data for development and demos |

**API endpoints**

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/alerts` | List alerts (optional `severity`, `status`, `category` filters) |
| GET | `/api/alerts/summary` | Aggregated alert counts |
| GET | `/api/alerts/{id}` | Single alert by ID |
| GET | `/api/metrics` | List system metrics |
| GET | `/api/metrics/overview` | Metrics plus uptime and MTTA |

Interactive docs are available at `/docs` (Swagger) and `/redoc`.

### Frontend (`frontend/`)

| Module | Responsibility |
|--------|----------------|
| `src/App.tsx` | Dashboard layout, data fetching, auto-refresh |
| `src/api/client.ts` | Typed fetch wrappers for API calls |
| `src/components/` | UI: summary cards, metrics grid, alerts table, severity chart |
| `vite.config.ts` | Dev server proxy to backend on port 8000 |

The dashboard polls the API every 30 seconds and supports client-side severity/status filtering.

## Security Practices

- **Input validation**: Query parameters validated via Pydantic enums and length limits.
- **CORS**: Restricted to configured origins; read-only `GET` methods allowed.
- **Secrets**: No credentials in source; configuration via `.env` (see `.env.example`).
- **Error handling**: 404 for missing alerts; API errors surfaced in the UI.
- **Dependency pinning**: Locked versions in `requirements.txt` and `package.json`.

## CI/CD

GitHub Actions workflows:

- **`ci.yml`**: Runs on every push/PR — backend pytest suite and frontend type-check + build.
- **`deploy.yml`**: Runs on `main` push (manual trigger supported) — tests, builds frontend, uploads `dist` artifact. Extend with your hosting provider.

## Local Development

1. Start the API: `uvicorn app.main:app --reload` from `backend/`.
2. Start the UI: `npm run dev` from `frontend/`.
3. Open http://localhost:5173 — Vite proxies `/api` to the backend.

## Future Extensions

- Persist alerts in PostgreSQL or ingest from a SIEM webhook.
- Add JWT authentication and role-based access.
- WebSocket push for real-time alert streaming.
- Integrate with Prometheus or Datadog for live metrics.
