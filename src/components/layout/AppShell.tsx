import type { ReactNode } from "react";
import type { RouteKey } from "../../types";
import { AIAssistantPanel } from "./AIAssistantPanel";
import { DecisionProgress } from "./DecisionProgress";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppShellProps {
  activeRoute: RouteKey;
  children: ReactNode;
}

export function AppShell({ activeRoute, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar activeRoute={activeRoute} />
      <main className="workspace">
        <Topbar />
        <DecisionProgress activeRoute={activeRoute} />
        <div className="workspace-grid">
          <section className="page-surface">{children}</section>
          <AIAssistantPanel route={activeRoute} />
        </div>
      </main>
    </div>
  );
}
