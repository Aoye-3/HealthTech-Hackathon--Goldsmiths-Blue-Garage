import { CheckCircle2 } from "lucide-react";
import type { RouteKey } from "../../types";

const steps: Array<{ key: RouteKey; label: string }> = [
  { key: "need-definition", label: "Need statement" },
  { key: "shortlist", label: "Shortlist" },
  { key: "compare", label: "Quote comparison" },
  { key: "peer-evidence", label: "Peer evidence" },
  { key: "approval-pack", label: "Approval pack" },
  { key: "outcomes", label: "Outcome tracking" }
];

const order = steps.map((step) => step.key);

interface DecisionProgressProps {
  activeRoute: RouteKey;
}

export function DecisionProgress({ activeRoute }: DecisionProgressProps) {
  const activeIndex = order.indexOf(activeRoute);

  return (
    <section className="decision-progress" aria-label="Procurement decision progress">
      {steps.map((step, index) => {
        const complete = index < activeIndex;
        const active = index === activeIndex;
        return (
          <div className={`progress-step ${complete ? "complete" : ""} ${active ? "active" : ""}`} key={step.key}>
            <span>{complete ? <CheckCircle2 size={15} /> : index + 1}</span>
            <strong>{step.label}</strong>
          </div>
        );
      })}
    </section>
  );
}
