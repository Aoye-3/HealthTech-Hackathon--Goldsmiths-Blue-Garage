import type { ReactNode } from "react";
import type { RouteKey } from "../../types";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { DecisionProgress } from "./DecisionProgress";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  activeRoute: RouteKey;
  children: ReactNode;
  hideAssistantPanel?: boolean;
  showWorkflow: boolean;
}

export function AppShell({ activeRoute, children, hideAssistantPanel = false, showWorkflow }: AppShellProps) {
  const showAssistantPanel = showWorkflow && !hideAssistantPanel;

  return (
    <div className="app-shell">
      <Sidebar activeRoute={activeRoute} />
      <main className="workspace">
        <Topbar />
        {showWorkflow ? <DecisionProgress activeRoute={activeRoute} /> : null}
        <div className={`workspace-grid ${showAssistantPanel ? "" : "full-width"}`}>
          <section className="page-surface">{children}</section>
          {showAssistantPanel ? <AIAssistantPanel route={activeRoute} /> : null}
        </div>
      </main>
    </div>
  );
}
