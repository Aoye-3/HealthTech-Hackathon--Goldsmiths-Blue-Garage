import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  ClipboardList,
  Database,
  Folder,
  Heart,
  MapPinned,
  Package,
  Ruler,
  Stethoscope,
  Undo2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Product } from "../../types";
import { buildPeerEvidencePath, money, navigateTo } from "../../utils/routing";

interface ProductDetailCardProps {
  onBackToStack: () => void;
  onToggle: (productId: string) => void;
  product: Product;
  selected: boolean;
}

export function ProductDetailCard({ onBackToStack, onToggle, product, selected }: ProductDetailCardProps) {
  return (
    <section className="product-detail-workspace" aria-label={`${product.name} product details`}>
      <button className="link-button detail-back" onClick={onBackToStack} type="button">
        <ArrowLeft size={16} />
        Back to product list
      </button>
      <article className="product-detail-card">
        <div className="detail-kicker">
          <span className="soft-badge">
            <CheckCircle2 size={14} />
            NHS Reviewed
          </span>
          <div>
            <button aria-label="Bookmark product" className="ghost icon-only" type="button">
              <Bookmark size={18} />
            </button>
            <button aria-label="View peer evidence" className="ghost icon-only" onClick={() => navigateTo(buildPeerEvidencePath(product.id))} type="button">
              <MapPinned size={18} />
            </button>
          </div>
        </div>
        <div className="detail-hero">
          <div className={`product-image ${product.imageTone}`}>
            <span>{product.brand.slice(0, 2).toUpperCase()}</span>
          </div>
          <div>
            <h1>{product.name}</h1>
            <dl className="detail-meta">
              <div>
                <dt>MPC</dt>
                <dd>{product.mpc}</dd>
              </div>
              <div>
                <dt>GTIN</dt>
                <dd>{product.gtin}</dd>
              </div>
              <div>
                <dt>Unit of issue</dt>
                <dd>{product.unitOfIssue}</dd>
              </div>
              <div>
                <dt>Supplier</dt>
                <dd>{product.supplier}</dd>
              </div>
              <div>
                <dt>Unit price</dt>
                <dd>{money(product.unitPrice)} / unit</dd>
              </div>
              <div>
                <dt>Fit score</dt>
                <dd>{product.fitScore}%</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="detail-grid">
          <DetailFact icon={Folder} label="Category" value={product.category} />
          <DetailFact icon={Stethoscope} label="Clinical area" value={product.clinicalArea} />
          <DetailFact icon={Ruler} label="Size" value={product.size} />
          <DetailFact icon={Undo2} label="Return status" value={product.returnStatus} />
          <DetailFact icon={Package} label="Product type" value={product.productType} />
          <DetailFact icon={ClipboardList} label="Procurement note" value={product.procurementNote} />
          <DetailFact icon={Database} label="Data source" value={product.dataSource} />
          <DetailFact icon={MapPinned} label="Peer adoption" value={`${product.organisationsUsing} NHS organisations`} />
        </div>
        <div className="detail-actions">
          <button className={selected ? "secondary" : "primary"} onClick={() => onToggle(product.id)} type="button">
            <Heart size={17} fill={selected ? "currentColor" : "none"} />
            {selected ? "Remove from comparison" : "Add to comparison"}
          </button>
          <button className="secondary" onClick={() => navigateTo(buildPeerEvidencePath(product.id))} type="button">
            <MapPinned size={17} />
            View peer evidence
          </button>
          <button className="primary" onClick={() => navigateTo("/compare")} type="button">
            Continue comparison
            <ArrowRight size={17} />
          </button>
        </div>
      </article>
    </section>
  );
}

interface DetailFactProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function DetailFact({ icon: Icon, label, value }: DetailFactProps) {
  return (
    <div className="detail-fact">
      <Icon size={19} />
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}
