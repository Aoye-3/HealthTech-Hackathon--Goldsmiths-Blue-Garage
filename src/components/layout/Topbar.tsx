import { Bell, Building2, Search, ShieldCheck } from "lucide-react";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="assurance">
        <ShieldCheck size={16} />
        <span>All recommendations are NHS-reviewed and evidence-led</span>
      </div>
      <div className="topbar-actions">
        <label className="searchbox">
          <Search size={16} />
          <input aria-label="Search products" placeholder="Search products" />
        </label>
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="org-select">
          <Building2 size={17} />
          <span>Northfield PCN</span>
        </div>
        <div className="user-chip">
          <div className="avatar">JW</div>
          <div>
            <strong>Dr. James Wilson</strong>
            <span>GP Practice Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
