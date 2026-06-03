import { CheckCircle2, FileText, ShieldCheck, Users } from "lucide-react";

export function ApprovalStatus() {
  const items = [
    { label: "Evidence completeness", value: "94%", icon: ShieldCheck },
    { label: "Quotations collected", value: "3 / 3", icon: FileText },
    { label: "Verified peer reviews", value: "18", icon: Users },
    { label: "Ready for internal review", value: "Complete", icon: CheckCircle2 }
  ];

  return (
    <aside className="approval-status">
      <h3>Pack readiness</h3>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div className="status-row" key={item.label}>
            <Icon size={18} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        );
      })}
    </aside>
  );
}
