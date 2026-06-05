from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class Severity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class AlertStatus(str, Enum):
    OPEN = "open"
    ACKNOWLEDGED = "acknowledged"
    RESOLVED = "resolved"


class SecurityAlert(BaseModel):
    id: str
    title: str
    description: str
    severity: Severity
    status: AlertStatus
    source: str
    category: str
    timestamp: datetime
    affected_host: str | None = None


class AlertSummary(BaseModel):
    total: int
    open: int
    acknowledged: int
    resolved: int
    by_severity: dict[str, int]


class SystemMetric(BaseModel):
    name: str
    value: float
    unit: str
    status: str = Field(description="healthy, warning, or critical")
    updated_at: datetime


class MetricsOverview(BaseModel):
    metrics: list[SystemMetric]
    uptime_percent: float
    events_last_24h: int
    mean_time_to_acknowledge_minutes: float
