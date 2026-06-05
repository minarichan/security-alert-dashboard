import type { AlertSummary, MetricsOverview } from "../types";
import "./SummaryCards.css";

interface SummaryCardsProps {
  summary: AlertSummary;
  overview: MetricsOverview;
}

export function SummaryCards({ summary, overview }: SummaryCardsProps) {
  const cards = [
    { label: "Total Alerts", value: summary.total, accent: "blue" },
    { label: "Open", value: summary.open, accent: "orange" },
    { label: "Acknowledged", value: summary.acknowledged, accent: "yellow" },
    { label: "Resolved", value: summary.resolved, accent: "green" },
    { label: "Uptime", value: `${overview.uptime_percent}%`, accent: "blue" },
    { label: "Events (24h)", value: overview.events_last_24h, accent: "purple" },
    {
      label: "MTTA",
      value: `${overview.mean_time_to_acknowledge_minutes}m`,
      accent: "cyan",
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div key={card.label} className={`summary-card summary-card--${card.accent}`}>
          <span className="summary-card__label">{card.label}</span>
          <span className="summary-card__value">{card.value}</span>
        </div>
      ))}
    </div>
  );
}
