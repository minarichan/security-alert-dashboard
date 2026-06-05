from fastapi import APIRouter

from app.data.sample import SAMPLE_METRICS
from app.models import MetricsOverview, SystemMetric

router = APIRouter(prefix="/metrics", tags=["metrics"])


@router.get("", response_model=list[SystemMetric])
def list_metrics() -> list[SystemMetric]:
    return SAMPLE_METRICS


@router.get("/overview", response_model=MetricsOverview)
def get_metrics_overview() -> MetricsOverview:
    return MetricsOverview(
        metrics=SAMPLE_METRICS,
        uptime_percent=99.87,
        events_last_24h=342,
        mean_time_to_acknowledge_minutes=18.4,
    )
