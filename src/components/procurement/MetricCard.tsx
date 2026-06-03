import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon?: LucideIcon;
  label: string;
  value: string;
  detail?: string;
  tone?: "blue" | "teal" | "green" | "amber";
}

export function MetricCard({ icon: Icon, label, value, detail, tone = "blue" }: MetricCardProps) {
  return (
    <article className={`metric-card ${tone}`}>
      {Icon ? <Icon size={22} /> : null}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {detail ? <small>{detail}</small> : null}
      </div>
    </article>
  );
}
