import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
async def test_list_metrics(client):
    response = await client.get("/api/metrics")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert "name" in data[0]
    assert "value" in data[0]


@pytest.mark.asyncio
async def test_metrics_overview(client):
    response = await client.get("/api/metrics/overview")
    assert response.status_code == 200
    data = response.json()
    assert "uptime_percent" in data
    assert "events_last_24h" in data
    assert len(data["metrics"]) >= 1


@pytest.mark.asyncio
async def test_health_check(client):
    response = await client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
