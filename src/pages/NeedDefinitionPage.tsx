import {
  ArrowRight,
  Bot,
  CheckCircle2,
  FileText,
  Grid2X2,
  RotateCcw,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  ThumbsDown,
  ThumbsUp,
  Users,
  XCircle
} from "lucide-react";
import { useMemo, useState } from "react";
import { clinicalNeed, products } from "../data/procurementData";
import { navigateTo } from "../utils/routing";

interface NeedDefinitionPageProps {
  onSubmitNeed: () => void;
  submitted: boolean;
}

export function NeedDefinitionPage({ onSubmitNeed, submitted }: NeedDefinitionPageProps) {
  const [needDraft, setNeedDraft] = useState(clinicalNeed);
  const [filterStatus, setFilterStatus] = useState<Record<string, "accepted" | "rejected" | undefined>>({});
  const [confirmed, setConfirmed] = useState(false);
  const pathway = [
    { icon: Search, title: "Refine scope", text: "Confirm patient population, setting and outcomes." },
    { icon: FileText, title: "View evidence summary", text: "Review guidance, NICE and peer evidence." },
    { icon: Grid2X2, title: "Explore solutions", text: "See NHS-reviewed products that fit." },
    { icon: Users, title: "Compare options", text: "Compare outcomes, costs and evidence." },
    { icon: ShieldCheck, title: "Create approval pack", text: "Generate business case and documents." }
  ];
  const extractedFilters = useMemo(() => {
    const prompt = needDraft.toLowerCase();
    const matchedProducts = products.filter((product) =>
      prompt.includes(product.name.toLowerCase()) || prompt.includes(product.brand.toLowerCase())
    );

    if (matchedProducts.length > 0) {
      return matchedProducts.map((product) => ({
        id: product.id,
        kind: "Product name",
        label: product.name,
        detail: product.category
      }));
    }

    return [
      {
        id: "remote-bp-monitoring",
        kind: "Device category",
        label: "Remote BP monitoring",
        detail: "Home blood pressure monitoring for multi-practice rollout"
      },
      {
        id: "connected-bp-monitor",
        kind: "Device category",
        label: "Connected BP monitor",
        detail: "Patient-friendly kit with data transfer and EMR integration"
      },
      {
        id: "clinical-bp-monitor",
        kind: "Device category",
        label: "Clinical BP monitor",
        detail: "Validated BP device suitable for primary care pathways"
      },
      {
        id: "elderly-usability",
        kind: "Selection criterion",
        label: "Elderly patient usability",
        detail: "Readable display, simple cuff use and low-friction setup"
      }
    ];
  }, [needDraft]);
  const acceptedCount = extractedFilters.filter((filter) => filterStatus[filter.id] === "accepted").length;
  const readyForComparison = confirmed || acceptedCount >= 2;

  function handleSubmitNeed() {
    onSubmitNeed();
  }

  function updateFilterStatus(id: string, status: "accepted" | "rejected") {
    setFilterStatus((current) => ({ ...current, [id]: status }));
  }

  function resetFilters() {
    setFilterStatus({});
    setConfirmed(false);
  }

  if (submitted) {
    return (
      <div className="clarification-workspace">
        <aside className="filter-panel" aria-label="AI extracted filters">
          <div className="filter-panel-heading">
            <div>
              <span className="breadcrumb">Need definition / AI clarification</span>
              <h1>AI-extracted filters</h1>
              <p>Filters are generated from the clinical prompt and refined through the conversation.</p>
            </div>
            <SlidersHorizontal size={22} />
          </div>
          <div className="filter-list">
            {extractedFilters.map((filter) => {
              const status = filterStatus[filter.id];
              return (
                <article className={`filter-item ${status ?? ""}`} key={filter.id}>
                  <div className="filter-icon">
                    {status === "rejected" ? <XCircle size={18} /> : <CheckCircle2 size={18} />}
                  </div>
                  <div>
                    <span>{filter.kind}</span>
                    <strong>{filter.label}</strong>
                    <p>{filter.detail}</p>
                  </div>
                  <div className="filter-actions" aria-label={`Review ${filter.label}`}>
                    <button type="button" onClick={() => updateFilterStatus(filter.id, "accepted")}>
                      <ThumbsUp size={15} />
                      Correct
                    </button>
                    <button type="button" onClick={() => updateFilterStatus(filter.id, "rejected")}>
                      <ThumbsDown size={15} />
                      Wrong
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="filter-panel-actions">
            <button className="secondary" type="button" onClick={resetFilters}>
              <RotateCcw size={16} />
              Reload
            </button>
            <button className="primary" type="button" onClick={() => setConfirmed(true)}>
              Confirm scope
            </button>
          </div>
          <p className="locked-note">
            <ShieldCheck size={15} />
            Filters are used only to narrow NHS-reviewed product comparison.
          </p>
        </aside>
        <section className="clarification-chat" aria-label="AI clarification chat">
          <div className="chat-thread">
            <article className="chat-bubble user">
              <p>{needDraft}</p>
              <span>Dr. James Wilson</span>
            </article>
            <article className="chat-bubble assistant">
              <div className="chat-avatar">
                <Bot size={18} />
              </div>
              <div>
                <p>
                  I can help narrow this request before product comparison. I have extracted device categories and
                  procurement criteria from the prompt. Please mark each item as correct or wrong.
                </p>
                <ol>
                  <li>Confirm whether remote BP monitoring is the intended category.</li>
                  <li>Confirm if elderly usability and multi-practice rollout are required criteria.</li>
                  <li>Reject anything that should not be used for shortlist filtering.</li>
                </ol>
                <span>AI assistant</span>
              </div>
            </article>
            {readyForComparison ? (
              <article className="comparison-ready">
                <SparkleMarker />
                <div>
                  <strong>Scope is narrow enough for product comparison.</strong>
                  <p>Continue to compare NHS-reviewed products against the confirmed need.</p>
                </div>
                <button className="primary" type="button" onClick={() => navigateTo("/compare")}>
                  Continue to product comparison
                  <ArrowRight size={16} />
                </button>
              </article>
            ) : null}
          </div>
          <div className="chat-composer">
            <input aria-label="Ask a clarification question" placeholder="Ask a follow-up question..." />
            <button className="secondary" type="button">Advanced</button>
            <button aria-label="Send clarification question" type="button">
              <Send size={18} />
            </button>
          </div>
          <p className="ai-disclaimer">AI-generated content may be incomplete. Please confirm against clinical judgement and NHS guidance.</p>
        </section>
      </div>
    );
  }

  return (
    <div className={`page-stack ${submitted ? "" : "initial-intake"}`}>
      <section className="intake-card">
        <div className="hero-panel">
          <div>
            <h1>What clinical need are you solving today?</h1>
            <p>Describe the clinical challenge or service need in plain language. Our AI will identify the scope, evidence and best-fit solutions.</p>
          </div>
          <div className="sparkle-field" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
        <section className="need-card">
          <div className="section-title-row">
            <h2>Describe your clinical need</h2>
            <span className="soft-badge">AI assisted</span>
          </div>
          <textarea
            aria-label="Describe clinical need"
            onChange={(event) => setNeedDraft(event.target.value)}
            value={needDraft}
          />
          <div className="privacy-note">
            <ShieldCheck size={16} />
            <span>We do not retain identifiable data. Your input is secure and confidential.</span>
          </div>
        <button aria-label="Analyse clinical need" className="send-button" type="button" onClick={handleSubmitNeed}>
          <Send size={20} />
        </button>
        </section>
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

function SparkleMarker() {
  return (
    <div className="sparkle-marker" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}
