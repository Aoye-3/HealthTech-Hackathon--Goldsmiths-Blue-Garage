import { useEffect, useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { ApprovalPackPage } from "./pages/ApprovalPackPage";
import { ComparePage } from "./pages/ComparePage";
import { NeedDefinitionPage } from "./pages/NeedDefinitionPage";
import { OutcomesPage } from "./pages/OutcomesPage";
import { PeerEvidencePage } from "./pages/PeerEvidencePage";
import { ShortlistPage } from "./pages/ShortlistPage";
import type { RouteKey } from "./types";
import { getRouteKey } from "./utils/routing";

function renderRoute(route: RouteKey) {
  switch (route) {
    case "shortlist":
      return <ShortlistPage />;
    case "compare":
      return <ComparePage />;
    case "peer-evidence":
      return <PeerEvidencePage />;
    case "approval-pack":
      return <ApprovalPackPage />;
    case "outcomes":
      return <OutcomesPage />;
    default:
      return <NeedDefinitionPage />;
  }
}

export function App() {
  const [route, setRoute] = useState<RouteKey>(() => getRouteKey(window.location.pathname));

  useEffect(() => {
    const onRouteChange = () => setRoute(getRouteKey(window.location.pathname));
    window.addEventListener("popstate", onRouteChange);
    if (window.location.pathname === "/") {
      window.history.replaceState({}, "", "/need-definition");
      onRouteChange();
    }
    return () => window.removeEventListener("popstate", onRouteChange);
  }, []);

  return <AppShell activeRoute={route}>{renderRoute(route)}</AppShell>;
}
