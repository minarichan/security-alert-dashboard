import type { AlertStatus, Severity } from "../types";
import "./AlertFilters.css";

interface AlertFiltersProps {
  severity: Severity | "";
  status: AlertStatus | "";
  onSeverityChange: (value: Severity | "") => void;
  onStatusChange: (value: AlertStatus | "") => void;
}

export function AlertFilters({
  severity,
  status,
  onSeverityChange,
  onStatusChange,
}: AlertFiltersProps) {
  return (
    <div className="alert-filters">
      <label className="alert-filters__field">
        <span>Severity</span>
        <select
          value={severity}
          onChange={(e) => onSeverityChange(e.target.value as Severity | "")}
        >
          <option value="">All</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      <label className="alert-filters__field">
        <span>Status</span>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value as AlertStatus | "")}
        >
          <option value="">All</option>
          <option value="open">Open</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </select>
      </label>
    </div>
  );
}
