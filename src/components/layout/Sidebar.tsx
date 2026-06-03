import {
  BarChart3,
  ClipboardCheck,
  FileSearch,
  Home,
  MapPinned,
  Scale,
  Search
} from "lucide-react";
import type { NavItem, RouteKey } from "../../types";
import { navigateTo } from "../../utils/routing";

const navItems: NavItem[] = [
  { key: "need-definition", label: "Need Definition", href: "/need-definition", icon: Home },
  { key: "shortlist", label: "Product Shortlist", href: "/shortlist", icon: Search },
  { key: "compare", label: "Product Comparison", href: "/compare", icon: Scale },
  { key: "peer-evidence", label: "Peer Evidence", href: "/peer-evidence/surebp-connect", icon: MapPinned },
  { key: "approval-pack", label: "Approval Pack", href: "/approval-pack", icon: ClipboardCheck },
  { key: "outcomes", label: "Procurement Outcome", href: "/outcomes", icon: BarChart3 }
];

interface SidebarProps {
  activeRoute: RouteKey;
}

export function Sidebar({ activeRoute }: SidebarProps) {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="brand">
        <div className="nhs-logo">NHS</div>
        <div>
          <strong>ProcureSmart</strong>
          <span>Evidence-led procurement for primary care</span>
        </div>
      </div>
      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.key === activeRoute;
          return (
            <button
              className={`nav-item ${active ? "active" : ""}`}
              key={item.key}
              onClick={() => navigateTo(item.href)}
              type="button"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="sidebar-card">
        <FileSearch size={18} />
        <div>
          <strong>Current request</strong>
          <span>Home BP monitoring solution</span>
        </div>
      </div>
      <div className="sidebar-footer">
        <span>Trusted by NHS organisations</span>
        <strong>Built for NHS. Backed by evidence.</strong>
      </div>
    </aside>
  );
}
