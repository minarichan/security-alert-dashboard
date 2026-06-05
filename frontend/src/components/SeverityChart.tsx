import type { AlertSummary } from "../types";
import "./SeverityChart.css";

interface SeverityChartProps {
  summary: AlertSummary;
}

const SEVERITY_ORDER = ["critical", "high", "medium", "low"] as const;
const SEVERITY_COLORS: Record<string, string> = {
  critical: "var(--severity-critical)",
  high: "var(--severity-high)",
  medium: "var(--severity-medium)",
  low: "var(--severity-low)",
};

export function SeverityChart({ summary }: SeverityChartProps) {
  const max = Math.max(...SEVERITY_ORDER.map((s) => summary.by_severity[s] ?? 0), 1);

  return (
    <div className="severity-chart">
      <h3 className="severity-chart__title">Alerts by Severity</h3>
      <div className="severity-chart__bars">
        {SEVERITY_ORDER.map((severity) => {
          const count = summary.by_severity[severity] ?? 0;
          const width = (count / max) * 100;
          return (
            <div key={severity} className="severity-chart__row">
              <span className="severity-chart__label">{severity}</span>
              <div className="severity-chart__track">
                <div
                  className="severity-chart__bar"
                  style={{
                    width: `${width}%`,
                    backgroundColor: SEVERITY_COLORS[severity],
                  }}
                />
              </div>
              <span className="severity-chart__count">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
