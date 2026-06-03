import { Download, FileText, Share2, ShieldCheck } from "lucide-react";
import { ApprovalStatus } from "../components/procurement/ApprovalStatus";
import { MetricCard } from "../components/procurement/MetricCard";
import { approvalSections } from "../data/procurementData";

export function ApprovalPackPage() {
  return (
    <div className="page-stack">
      <div className="page-heading">
        <div>
          <span className="breadcrumb">Comparison / Approval pack</span>
          <h1>Approval Pack Ready for Review</h1>
          <p>Your evidence has been compiled into a complete business case. Review each section or export the pack for internal approval.</p>
        </div>
        <div className="heading-actions">
          <button className="secondary" type="button"><Download size={16} /> Export PDF</button>
          <button className="primary" type="button"><Share2 size={16} /> Share with procurement team</button>
        </div>
      </div>
      <div className="approval-layout">
        <section className="approval-sections">
          <h2>Document sections</h2>
          {approvalSections.map((section, index) => (
            <article className={index === 4 ? "active" : ""} key={section}>
              <span>{index + 1}</span>
              <strong>{section}</strong>
              <ShieldCheck size={16} />
            </article>
          ))}
          <button className="secondary full" type="button">Reorder sections</button>
        </section>
        <section className="pack-preview">
          <h2>Approval pack preview</h2>
          <div className="document-cover">
            <div className="nhs-logo compact">NHS</div>
            <span>Northfield PCN</span>
            <h3>Business Case for Remote Blood Pressure Monitoring</h3>
            <p>Evidence-led review pack</p>
            <div className="cover-meta">
              <span>Prepared for: Northfield PCN</span>
              <span>Date: 21 May 2025</span>
            </div>
            <div className="cover-wave" />
          </div>
          <div className="pack-summary">
            <MetricCard icon={FileText} label="Total pages" value="28" detail="Including appendices" />
            <MetricCard label="Sections" value="7" detail="Complete" />
            <MetricCard label="Supporting files" value="42" detail="Attached" />
            <MetricCard label="Est. review time" value="15 mins" detail="For reviewers" />
          </div>
        </section>
        <ApprovalStatus />
      </div>
    </div>
  );
}
