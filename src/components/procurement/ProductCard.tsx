import { Bookmark, CheckCircle2, Heart, MapPinned, Scale, Star } from "lucide-react";
import type { Product } from "../../types";
import { money, navigateTo } from "../../utils/routing";

interface ProductCardProps {
  product: Product;
  selected: boolean;
  onToggle: (productId: string) => void;
}

export function ProductCard({ product, selected, onToggle }: ProductCardProps) {
  return (
    <article className={`product-card ${selected ? "selected" : ""}`}>
      <div className={`product-image ${product.imageTone}`}>
        <span>{product.brand.slice(0, 2).toUpperCase()}</span>
      </div>
      <div className="product-card-body">
        <div className="card-kicker">
          <span>
            <CheckCircle2 size={14} />
            NHS reviewed
          </span>
          <button aria-label="Bookmark product" type="button">
            <Bookmark size={17} />
          </button>
        </div>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <div className="product-stats">
          <span>{product.organisationsUsing} NHS orgs</span>
          <span>{product.verifiedReviews} verified reviews</span>
          <span>{product.fitScore}% fit score</span>
        </div>
        <div className="rating-row">
          <Star size={16} fill="currentColor" />
          <strong>{product.rating.toFixed(1)}</strong>
          <span>{money(product.unitPrice)} / unit</span>
        </div>
        <p className="ai-rationale">{product.aiRationale}</p>
        <div className="card-actions">
          <button type="button" onClick={() => onToggle(product.id)} className={selected ? "secondary" : "primary"}>
            <Heart size={16} fill={selected ? "currentColor" : "none"} />
            {selected ? "Remove from shortlist" : "Add to comparison"}
          </button>
          <button type="button" onClick={() => navigateTo(`/peer-evidence/${product.id}`)} className="secondary">
            <MapPinned size={16} />
            View evidence
          </button>
          <button type="button" onClick={() => navigateTo("/compare")} className="ghost">
            <Scale size={16} />
            Compare
          </button>
        </div>
      </div>
    </article>
  );
}
