import type { SystemMetric } from "../types";
import "./MetricsGrid.css";

interface MetricsGridProps {
  metrics: SystemMetric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="metrics-grid">
      {metrics.map((metric) => (
        <div key={metric.name} className={`metric-card metric-card--${metric.status}`}>
          <div className="metric-card__header">
            <span className="metric-card__name">{metric.name}</span>
            <span className={`metric-card__badge metric-card__badge--${metric.status}`}>
              {metric.status}
            </span>
          </div>
          <div className="metric-card__value">
            {metric.value}
            <span className="metric-card__unit">{metric.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
