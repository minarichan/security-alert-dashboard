import type {
  AlertSummary,
  MetricsOverview,
  SecurityAlert,
  Severity,
  AlertStatus,
} from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export function fetchAlerts(params?: {
  severity?: Severity;
  status?: AlertStatus;
  category?: string;
}): Promise<SecurityAlert[]> {
  const search = new URLSearchParams();
  if (params?.severity) search.set("severity", params.severity);
  if (params?.status) search.set("status", params.status);
  if (params?.category) search.set("category", params.category);
  const query = search.toString();
  return fetchJson<SecurityAlert[]>(`/api/alerts${query ? `?${query}` : ""}`);
}

export function fetchAlertSummary(): Promise<AlertSummary> {
  return fetchJson<AlertSummary>("/api/alerts/summary");
}

export function fetchMetricsOverview(): Promise<MetricsOverview> {
  return fetchJson<MetricsOverview>("/api/metrics/overview");
}
