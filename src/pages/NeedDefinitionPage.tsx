import { ArrowRight, FileText, Grid2X2, Search, Send, ShieldCheck, Users } from "lucide-react";
import { extractedThemes, clinicalNeed } from "../data/procurementData";
import { navigateTo } from "../utils/routing";

export function NeedDefinitionPage() {
  const pathway = [
    { icon: Search, title: "Refine scope", text: "Confirm patient population, setting and outcomes." },
    { icon: FileText, title: "View evidence summary", text: "Review guidance, NICE and peer evidence." },
    { icon: Grid2X2, title: "Explore solutions", text: "See NHS-reviewed products that fit." },
    { icon: Users, title: "Compare options", text: "Compare outcomes, costs and evidence." },
    { icon: ShieldCheck, title: "Create approval pack", text: "Generate business case and documents." }
  ];

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div>
          <h1>What clinical need are you solving today?</h1>
          <p>Describe the clinical challenge or service need in plain language. Our AI will identify the scope, evidence and best-fit solutions.</p>
        </div>
        <div className="sparkle-field" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
      <section className="need-card">
        <div className="section-title-row">
          <h2>Describe your clinical need</h2>
          <span className="soft-badge">AI assisted</span>
        </div>
        <textarea defaultValue={clinicalNeed} aria-label="Describe clinical need" />
        <div className="privacy-note">
          <ShieldCheck size={16} />
          <span>We do not retain identifiable data. Your input is secure and confidential.</span>
        </div>
        <button className="send-button" type="button" onClick={() => navigateTo("/shortlist")}>
          <Send size={20} />
        </button>
      </section>
      <section>
        <h2 className="small-heading">AI-extracted themes</h2>
        <div className="theme-row">
          {extractedThemes.map((theme) => (
            <span className="theme-pill" key={theme}>{theme}</span>
          ))}
        </div>
      </section>
      <section className="pathway-card">
        <div>
          <h2>Recommended procurement pathway</h2>
          <p>Based on your need, here are the suggested next steps.</p>
        </div>
        <div className="pathway-steps">
          {pathway.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.title}>
                <div className="pathway-icon"><Icon size={21} /></div>
                <strong>{index + 1}. {step.title}</strong>
                <p>{step.text}</p>
                {index < pathway.length - 1 ? <ArrowRight size={17} className="pathway-arrow" /> : null}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
