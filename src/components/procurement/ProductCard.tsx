import { Bookmark, CheckCircle2, Eye, Heart, Star } from "lucide-react";
import type { Product } from "../../types";
import { money } from "../../utils/routing";

interface ProductCardProps {
  active?: boolean;
  product: Product;
  selected: boolean;
  onToggle: (productId: string) => void;
  onViewDetails: (productId: string) => void;
}

export function ProductCard({ active = false, product, selected, onToggle, onViewDetails }: ProductCardProps) {
  return (
    <article className={`product-card ${selected ? "selected" : ""} ${active ? "active" : ""}`}>
      <button
        aria-label={`View details for ${product.name}`}
        className={`product-image ${product.imageTone}`}
        onClick={() => onViewDetails(product.id)}
        type="button"
      >
        <span>{product.brand.slice(0, 2).toUpperCase()}</span>
      </button>
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
        <button className="card-title-button" onClick={() => onViewDetails(product.id)} type="button">
          <h3>{product.name}</h3>
        </button>
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
          <button type="button" onClick={() => onViewDetails(product.id)} className="secondary">
            <Eye size={16} />
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
