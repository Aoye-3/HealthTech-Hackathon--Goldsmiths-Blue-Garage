import { Bot, Send, Sparkles } from "lucide-react";
import { extractedThemes } from "../../data/procurementData";
import type { RouteKey } from "../../types";

const pageInsights: Record<RouteKey, string[]> = {
  "need-definition": [
    "Your request indicates remote monitoring, older patients and multi-practice rollout.",
    "I will only surface NHS-reviewed options with visible evidence."
  ],
  shortlist: [
    "These products best match remote monitoring, elderly usability and multi-site rollout requirements.",
    "SureBP Connect currently has the strongest verified adoption signal."
  ],
  compare: [
    "Product B offers the strongest balance of cost, verified outcomes and implementation support.",
    "Product C is above peer benchmark by 12% based on your current quote."
  ],
  "peer-evidence": [
    "I found 42 peer reviews for London PCNs and 15% adoption growth in similar practices.",
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
        <div className="ai-list">
          {pageInsights[route].slice(1).map((insight) => (
            <p key={insight}>{insight}</p>
          ))}
        </div>
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
        <div className="ai-prompt-stack">
          <button type="button">View rationale</button>
          <button type="button">Generate summary</button>
          <button type="button">Ask about risks</button>
        </div>
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
