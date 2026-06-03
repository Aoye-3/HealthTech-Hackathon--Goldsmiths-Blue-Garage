import { Activity, Building2, Cuboid, Target, TrendingDown, TrendingUp, Users } from "lucide-react";
import { FeedbackForm } from "../components/procurement/FeedbackForm";
import { MetricCard } from "../components/procurement/MetricCard";
import { outcomeMetrics } from "../data/procurementData";

export function OutcomesPage() {
  const icons = [Cuboid, Building2, Users, Target];

  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="breadcrumb">Deployment / Outcome tracking</span>
          <h1>Outcome Tracking</h1>
          <p>Insights on product performance, issue resolution and real-world impact after deployment.</p>
        </div>
        <button className="secondary" type="button">Feb 1 - Apr 30, 2025</button>
      </div>
      <section className="outcome-metrics">
        {outcomeMetrics.map((metric, index) => (
          <MetricCard
            detail={metric.delta}
            icon={icons[index]}
            key={metric.label}
            label={metric.label}
            tone={index === 3 ? "teal" : "blue"}
            value={metric.value}
          />
        ))}
      </section>
      <div className="outcome-layout">
        <section className="chart-grid">
          <article className="chart-card">
            <h2>Usage performance</h2>
            <strong>1,486</strong>
            <span><TrendingUp size={14} /> +14%</span>
            <div className="line-chart rising" />
          </article>
          <article className="chart-card">
            <h2>Issue feedback trend</h2>
            <strong>78</strong>
            <span className="good"><TrendingDown size={14} /> -28%</span>
            <div className="line-chart falling" />
          </article>
          <article className="chart-card">
            <h2>Reported effectiveness over time</h2>
            <strong>88%</strong>
            <span><Activity size={14} /> +6%</span>
            <div className="line-chart effectiveness" />
          </article>
          <article className="theme-card">
            <h2>Recent feedback themes</h2>
            {["Ease of use & workflow fit", "Time saving / Efficiency", "Training & onboarding", "Reporting & data insights"].map((item, index) => (
              <div key={item}>
                <span>{item}</span>
                <strong>{42 - index * 7}</strong>
              </div>
            ))}
          </article>
          <article className="theme-card">
            <h2>Common issues resolved</h2>
            {["Integration failures", "Access & permissions", "Data sync delays", "Report accuracy"].map((item, index) => (
              <div key={item}>
                <span>{item}</span>
                <strong>{23 - index * 5}</strong>
              </div>
            ))}
          </article>
          <article className="theme-card">
            <h2>Outcome summary</h2>
            {["Patient engagement", "Adoption rate", "Time saved per clinician", "Return on investment"].map((item) => (
              <div key={item}>
                <span>{item}</span>
                <strong>+8%</strong>
              </div>
            ))}
          </article>
        </section>
        <FeedbackForm />
      </div>
    </div>
  );
}
