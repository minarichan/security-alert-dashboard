import type { SecurityAlert } from "../types";
import "./AlertsTable.css";

interface AlertsTableProps {
  alerts: SecurityAlert[];
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  if (alerts.length === 0) {
    return <p className="alerts-table__empty">No alerts match the current filters.</p>;
  }

  return (
    <div className="alerts-table-wrapper">
      <table className="alerts-table">
        <thead>
          <tr>
            <th>Severity</th>
            <th>Title</th>
            <th>Status</th>
            <th>Source</th>
            <th>Category</th>
            <th>Host</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>
                <span className={`badge badge--severity-${alert.severity}`}>
                  {alert.severity}
                </span>
              </td>
              <td>
                <div className="alerts-table__title">{alert.title}</div>
                <div className="alerts-table__description">{alert.description}</div>
              </td>
              <td>
                <span className={`badge badge--status-${alert.status}`}>
                  {alert.status}
                </span>
              </td>
              <td className="alerts-table__mono">{alert.source}</td>
              <td>{alert.category}</td>
              <td className="alerts-table__mono">
                {alert.affected_host ?? "—"}
              </td>
              <td className="alerts-table__mono">{formatTimestamp(alert.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
