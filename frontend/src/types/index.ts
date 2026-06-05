export type Severity = "low" | "medium" | "high" | "critical";
export type AlertStatus = "open" | "acknowledged" | "resolved";

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: AlertStatus;
  source: string;
  category: string;
  timestamp: string;
  affected_host: string | null;
}

export interface AlertSummary {
  total: number;
  open: number;
  acknowledged: number;
  resolved: number;
  by_severity: Record<Severity, number>;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: "healthy" | "warning" | "critical";
  updated_at: string;
}

export interface MetricsOverview {
  metrics: SystemMetric[];
  uptime_percent: number;
  events_last_24h: number;
  mean_time_to_acknowledge_minutes: number;
}
