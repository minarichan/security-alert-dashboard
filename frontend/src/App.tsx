import { useCallback, useEffect, useState } from "react";
import { fetchAlertSummary, fetchAlerts, fetchMetricsOverview } from "./api/client";
import { AlertFilters } from "./components/AlertFilters";
import { AlertsTable } from "./components/AlertsTable";
import { Header } from "./components/Header";
import { MetricsGrid } from "./components/MetricsGrid";
import { SeverityChart } from "./components/SeverityChart";
import { SummaryCards } from "./components/SummaryCards";
import type {
  AlertSummary,
  AlertStatus,
  MetricsOverview,
  SecurityAlert,
  Severity,
} from "./types";
import "./App.css";

const REFRESH_INTERVAL_MS = 30_000;

export default function App() {
  const [summary, setSummary] = useState<AlertSummary | null>(null);
  const [overview, setOverview] = useState<MetricsOverview | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [severity, setSeverity] = useState<Severity | "">("");
  const [status, setStatus] = useState<AlertStatus | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      const [summaryData, overviewData, alertsData] = await Promise.all([
        fetchAlertSummary(),
        fetchMetricsOverview(),
        fetchAlerts({
          severity: severity || undefined,
          status: status || undefined,
        }),
      ]);
      setSummary(summaryData);
      setOverview(overviewData);
      setAlerts(alertsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, [severity, status]);

  useEffect(() => {
    setLoading(true);
    loadDashboard();
  }, [loadDashboard]);

  useEffect(() => {
    const interval = setInterval(loadDashboard, REFRESH_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [loadDashboard]);

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {loading && !summary ? (
          <div className="app__loading">Loading security dashboard…</div>
        ) : error ? (
          <div className="app__error">{error}</div>
        ) : summary && overview ? (
          <div className="app__grid">
            <section>
              <h2 className="app__section-title">Overview</h2>
              <SummaryCards summary={summary} overview={overview} />
            </section>

            <section>
              <h2 className="app__section-title">System Metrics</h2>
              <MetricsGrid metrics={overview.metrics} />
            </section>

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 320px",
                gap: "1.5rem",
              }}
            >
              <div>
                <h2 className="app__section-title">Security Alerts</h2>
                <AlertFilters
                  severity={severity}
                  status={status}
                  onSeverityChange={setSeverity}
                  onStatusChange={setStatus}
                />
                <AlertsTable alerts={alerts} />
              </div>
              <SeverityChart summary={summary} />
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
