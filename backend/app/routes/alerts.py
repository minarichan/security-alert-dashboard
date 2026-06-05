from fastapi import APIRouter, HTTPException, Query

from app.data.sample import SAMPLE_ALERTS
from app.models import AlertStatus, AlertSummary, SecurityAlert, Severity

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.get("", response_model=list[SecurityAlert])
def list_alerts(
    severity: Severity | None = Query(default=None),
    status: AlertStatus | None = Query(default=None),
    category: str | None = Query(default=None, min_length=1, max_length=64),
) -> list[SecurityAlert]:
    alerts = SAMPLE_ALERTS

    if severity is not None:
        alerts = [alert for alert in alerts if alert.severity == severity]
    if status is not None:
        alerts = [alert for alert in alerts if alert.status == status]
    if category is not None:
        alerts = [alert for alert in alerts if alert.category == category.lower()]

    return sorted(alerts, key=lambda alert: alert.timestamp, reverse=True)


@router.get("/summary", response_model=AlertSummary)
def get_alert_summary() -> AlertSummary:
    by_severity: dict[str, int] = {level.value: 0 for level in Severity}
    open_count = acknowledged_count = resolved_count = 0

    for alert in SAMPLE_ALERTS:
        by_severity[alert.severity.value] += 1
        if alert.status == AlertStatus.OPEN:
            open_count += 1
        elif alert.status == AlertStatus.ACKNOWLEDGED:
            acknowledged_count += 1
        else:
            resolved_count += 1

    return AlertSummary(
        total=len(SAMPLE_ALERTS),
        open=open_count,
        acknowledged=acknowledged_count,
        resolved=resolved_count,
        by_severity=by_severity,
    )


@router.get("/{alert_id}", response_model=SecurityAlert)
def get_alert(alert_id: str) -> SecurityAlert:
    for alert in SAMPLE_ALERTS:
        if alert.id == alert_id:
            return alert
    raise HTTPException(status_code=404, detail="Alert not found")
