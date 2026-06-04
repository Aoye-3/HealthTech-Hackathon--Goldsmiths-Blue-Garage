import { useEffect, useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { ApprovalPackPage } from "./pages/ApprovalPackPage";
import { ClinicianReviewPage } from "./pages/ClinicianReviewPage";
import { ComparePage } from "./pages/ComparePage";
import { NeedDefinitionPage } from "./pages/NeedDefinitionPage";
import { OutcomesPage } from "./pages/OutcomesPage";
import { PeerEvidencePage } from "./pages/PeerEvidencePage";
import { ShortlistPage } from "./pages/ShortlistPage";
import type { RouteKey } from "./types";
import { getRouteKey } from "./utils/routing";

function renderRoute(route: RouteKey, pathname: string, onNeedSubmit: () => void, needAnalysisStarted: boolean) {
  switch (route) {
    case "shortlist":
      return <ShortlistPage pathname={pathname} />;
    case "compare":
      return <ComparePage />;
    case "peer-evidence":
      return <PeerEvidencePage pathname={pathname} />;
    case "clinician-review":
      return <ClinicianReviewPage pathname={pathname} />;
    case "approval-pack":
      return <ApprovalPackPage />;
    case "outcomes":
      return <OutcomesPage />;
    default:
      return <NeedDefinitionPage onSubmitNeed={onNeedSubmit} submitted={needAnalysisStarted} />;
  }
}

export function App() {
  const [route, setRoute] = useState<RouteKey>(() => getRouteKey(window.location.pathname));
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [needAnalysisStarted, setNeedAnalysisStarted] = useState(false);

  useEffect(() => {
    const onRouteChange = () => {
      setPathname(window.location.pathname);
      setRoute(getRouteKey(window.location.pathname));
    };
    window.addEventListener("popstate", onRouteChange);
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", "/need-definition");
      onRouteChange();
    }
    return () => window.removeEventListener("popstate", onRouteChange);
  }, []);

  const workflowVisible = route !== "need-definition" || needAnalysisStarted;
  const hideAssistantPanel = route === "need-definition" && needAnalysisStarted;

  return (
    <AppShell activeRoute={route} hideAssistantPanel={hideAssistantPanel} showWorkflow={workflowVisible}>
      {renderRoute(route, pathname, () => setNeedAnalysisStarted(true), needAnalysisStarted)}
    </AppShell>
  );
}
