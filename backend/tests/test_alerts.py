import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
async def test_list_alerts_returns_data(client):
    response = await client.get("/api/alerts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 1
    assert "title" in data[0]
    assert "severity" in data[0]


@pytest.mark.asyncio
async def test_filter_alerts_by_severity(client):
    response = await client.get("/api/alerts", params={"severity": "critical"})
    assert response.status_code == 200
    data = response.json()
    assert all(item["severity"] == "critical" for item in data)


@pytest.mark.asyncio
async def test_alert_summary(client):
    response = await client.get("/api/alerts/summary")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == data["open"] + data["acknowledged"] + data["resolved"]
    assert "by_severity" in data


@pytest.mark.asyncio
async def test_get_alert_by_id(client):
    response = await client.get("/api/alerts/alert-001")
    assert response.status_code == 200
    assert response.json()["id"] == "alert-001"


@pytest.mark.asyncio
async def test_get_alert_not_found(client):
    response = await client.get("/api/alerts/nonexistent")
    assert response.status_code == 404
