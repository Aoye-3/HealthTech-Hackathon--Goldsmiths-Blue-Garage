import { ArrowRight, Bot, ClipboardList, ExternalLink, Scale, Send, ShieldCheck, Sparkles } from "lucide-react";
import { extractedThemes, products } from "../../data/procurementData";
import type { RouteKey } from "../../types";
import { buildPeerEvidencePath, navigateTo } from "../../utils/routing";

const pageInsights: Record<RouteKey, string[]> = {
  "need-definition": [
    "Your request indicates remote monitoring, older patients and multi-practice rollout.",
    "I will only surface NHS-reviewed options with visible evidence."
  ],
  shortlist: [
    "This product is evidence-aligned, widely used, and suitable for routine airway care.",
    "FAG4212 provides the clearest catalogue match for tracheostomy site care."
  ],
  compare: [
    "This second-round view compares shortlisted products using quote and evidence criteria.",
    "FAG4279 is above peer benchmark by 12% based on your current quote."
  ],
  "peer-evidence": [
    "This evidence view is linked to the selected product detail card.",
    "You can request a direct peer conversation before final approval."
  ],
  "approval-pack": [
    "The pack is ready for internal review. Evidence completeness is 94%.",
    "All required quotes and verified peer reviews are attached."
  ],
  outcomes: [
    "Issue volume is down 28% this quarter compared to the previous period.",
    "Your feedback will support future NHS procurement decisions."
  ]
};

interface AIAssistantPanelProps {
  route: RouteKey;
}

export function AIAssistantPanel({ route }: AIAssistantPanelProps) {
  const recommendedProduct = products[1];

  return (
    <aside className="ai-panel" aria-label="AI procurement assistant">
      <div className="ai-card">
        <div className="ai-header">
          <div>
            <Bot size={18} />
            <strong>AI Procurement Assistant</strong>
          </div>
          <span>Online</span>
        </div>
        <div className="ai-message primary">
          <Sparkles size={14} />
          <p>{pageInsights[route][0]}</p>
        </div>
        {route === "shortlist" ? (
          <div className="shortlist-ai-flow">
            <p className="ai-muted-card">{recommendedProduct.name} provides an easy to use airway care consumable option.</p>
            <div className="ai-prompt-stack">
              <button type="button"><ClipboardList size={16} /> First decision</button>
              <button type="button" onClick={() => navigateTo("/compare")}><Scale size={16} /> Continue comparison</button>
              <button type="button">Generate summary</button>
              <button type="button"><ShieldCheck size={16} /> Ask about risks</button>
            </div>
            <section className="ai-product-cta">
              <strong>{recommendedProduct.catalogueCode}</strong>
              <button className="primary full" type="button" onClick={() => navigateTo(buildPeerEvidencePath(recommendedProduct.id))}>
                View evidence
                <ExternalLink size={16} />
              </button>
            </section>
            <section className="ai-decision-card">
              <h2>First decision</h2>
              <p>Get early feedback on whether this product meets your requirements.</p>
              <strong>{recommendedProduct.catalogueCode}</strong>
              <button className="primary full" type="button" onClick={() => navigateTo("/compare")}>
                Continue comparison
                <ArrowRight size={16} />
              </button>
            </section>
          </div>
        ) : (
          <div className="ai-list">
            {pageInsights[route].slice(1).map((insight) => (
              <p key={insight}>{insight}</p>
            ))}
          </div>
        )}
        {route === "need-definition" ? (
          <div className="ai-keyword-analysis">
            <strong>AI-extracted themes</strong>
            <div>
              {extractedThemes.map((theme) => (
                <span key={theme}>{theme}</span>
              ))}
            </div>
          </div>
        ) : null}
        {route !== "shortlist" ? (
          <div className="ai-prompt-stack">
            <button type="button">View rationale</button>
            <button type="button">Generate summary</button>
            <button type="button">Ask about risks</button>
          </div>
        ) : null}
        <label className="ai-input">
          <span>Ask anything</span>
          <div>
            <input aria-label="Ask AI assistant" placeholder="Ask AI assistant..." />
            <button type="button" aria-label="Send question">
              <Send size={15} />
            </button>
          </div>
        </label>
      </div>
    </aside>
  );
}
