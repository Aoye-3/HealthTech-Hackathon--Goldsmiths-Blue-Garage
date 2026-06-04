import { ArrowRight, Bot, ClipboardList, ExternalLink, Scale, Send, ShieldCheck, Sparkles } from "lucide-react";
import { buildAssistantContext } from "../../data/assistantContext";
import { extractedThemes } from "../../data/procurementData";
import type { AssistantAction, RouteKey } from "../../types";
import { navigateTo } from "../../utils/routing";

const actionIcons: Record<string, typeof ClipboardList> = {
  "First decision": ClipboardList,
  "Continue comparison": Scale,
  "Ask about risks": ShieldCheck
};

interface AIAssistantPanelProps {
  route: RouteKey;
}

function renderAction(action: AssistantAction) {
  const Icon = actionIcons[action.label];
  const handleClick = () => {
    if (action.kind === "navigation" && action.targetPath) {
      navigateTo(action.targetPath);
    }
  };

  return (
    <button key={action.label} type="button" onClick={handleClick}>
      {Icon ? <Icon size={16} /> : null}
      {action.label}
    </button>
  );
}

export function AIAssistantPanel({ route }: AIAssistantPanelProps) {
  const context = buildAssistantContext(route);
  const clean = context.mode === "clean";

  return (
    <aside className="ai-panel" aria-label="AI procurement assistant" data-conversation-scope={context.conversationScope}>
      <div className="ai-card">
        <div className="ai-header">
          <div>
            <Bot size={18} />
            <strong>AI Procurement Assistant</strong>
          </div>
          <span>Online</span>
        </div>
        {clean ? null : (
          <>
            {context.primaryMessage ? (
              <div className="ai-message primary">
                <Sparkles size={14} />
                <p>{context.primaryMessage}</p>
              </div>
            ) : null}
            {route === "shortlist" ? (
              <div className="shortlist-ai-flow">
                {context.secondaryMessages.map((message) => (
                  <p className="ai-muted-card" key={message}>{message}</p>
                ))}
                <div className="ai-prompt-stack">
                  {context.actions.map(renderAction)}
                </div>
                {context.productCta ? (
                  <section className="ai-product-cta">
                    <strong>{context.productCta.label}</strong>
                    <button className="primary full" type="button" onClick={() => navigateTo(context.productCta?.targetPath ?? "")}>
                      View evidence
                      <ExternalLink size={16} />
                    </button>
                  </section>
                ) : null}
                {context.decisionCard ? (
                  <section className="ai-decision-card">
                    <h2>{context.decisionCard.title}</h2>
                    <p>{context.decisionCard.body}</p>
                    <strong>{context.decisionCard.productCode}</strong>
                    <button className="primary full" type="button" onClick={() => navigateTo(context.decisionCard?.targetPath ?? "")}>
                      Continue comparison
                      <ArrowRight size={16} />
                    </button>
                  </section>
                ) : null}
              </div>
            ) : (
              <>
                <div className="ai-list">
                  {context.secondaryMessages.map((message) => (
                    <p key={message}>{message}</p>
                  ))}
                </div>
                <div className="ai-prompt-stack">
                  {context.actions.map(renderAction)}
                </div>
              </>
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
          </>
        )}
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
