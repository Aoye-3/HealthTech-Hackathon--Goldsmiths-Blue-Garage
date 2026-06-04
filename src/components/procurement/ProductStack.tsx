import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Database,
  Folder,
  Heart,
  MoreHorizontal,
  Package,
  Ruler,
  Stethoscope,
  Undo2,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Product } from "../../types";

interface ProductStackProps {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onToggle: (productId: string) => void;
  onViewDetails: (productId: string) => void;
  products: Product[];
  selectedIds: string[];
}

export function ProductStack({
  activeIndex,
  onActiveIndexChange,
  onToggle,
  onViewDetails,
  products,
  selectedIds
}: ProductStackProps) {
  const activeProduct = products[activeIndex] ?? products[0];
  const previousIndex = activeIndex === 0 ? products.length - 1 : activeIndex - 1;
  const nextIndex = activeIndex === products.length - 1 ? 0 : activeIndex + 1;

  return (
    <section className="product-stack-panel" aria-label="Product shortlist carousel">
      <div className="stack-controls">
        <button aria-label="Previous product" className="stack-round-button" onClick={() => onActiveIndexChange(previousIndex)} type="button">
          <ChevronLeft size={22} />
        </button>
        <strong>{activeIndex + 1} / 36 products</strong>
        <button aria-label="Next product" className="stack-round-button" onClick={() => onActiveIndexChange(nextIndex)} type="button">
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="product-stack">
        <CataloguePreviewCard product={products[previousIndex]} side="left" onViewDetails={onViewDetails} />
        <CatalogueMainCard
          onToggle={onToggle}
          onViewDetails={onViewDetails}
          product={activeProduct}
          selected={selectedIds.includes(activeProduct.id)}
        />
        <CataloguePreviewCard product={products[nextIndex]} side="right" onViewDetails={onViewDetails} />
      </div>

      <div className="stack-action-bar">
        <button className="stack-pill secondary" type="button">
          <X size={34} />
          <strong>Not a fit</strong>
        </button>
        <button className="stack-pill secondary" type="button" onClick={() => onViewDetails(activeProduct.id)}>
          <span className="vs-badge">Vs</span>
          <span>
            <strong>Battle</strong>
            <small>Compare with another product</small>
          </span>
        </button>
        <button className="stack-pill primary" type="button" onClick={() => onToggle(activeProduct.id)}>
          <Heart size={34} fill={selectedIds.includes(activeProduct.id) ? "currentColor" : "none"} />
          <span>
            <strong>{selectedIds.includes(activeProduct.id) ? "Added to comparison" : "Double-tap to add"}</strong>
            <small>{selectedIds.includes(activeProduct.id) ? "Selected for comparison" : "Add to comparison"}</small>
          </span>
        </button>
      </div>
    </section>
  );
}

interface CatalogueCardProps {
  onToggle?: (productId: string) => void;
  onViewDetails: (productId: string) => void;
  product: Product;
  selected?: boolean;
  side?: "left" | "right";
}

function CatalogueMainCard({ onToggle, onViewDetails, product, selected = false }: CatalogueCardProps) {
  return (
    <article className="catalogue-card active-card">
      <div className="catalogue-card-top">
        <span className="reviewed-badge">NHS Reviewed</span>
        <div className="catalogue-tools">
          <button aria-label="Bookmark product" type="button"><Bookmark size={19} /></button>
          <button aria-label="More actions" type="button"><MoreHorizontal size={21} /></button>
        </div>
      </div>

      <div className="catalogue-main">
        <button className={`catalogue-image ${product.imageTone}`} onClick={() => onViewDetails(product.id)} type="button">
          <span aria-hidden="true" />
        </button>
        <div className="catalogue-copy">
          <h2>{product.name}</h2>
          <CatalogueMeta product={product} />
        </div>
      </div>

      <div className="catalogue-fact-grid">
        <CatalogueFact icon={Folder} label="Category" value={product.category} />
        <CatalogueFact icon={Stethoscope} label="Clinical area" value={product.clinicalArea} />
        <CatalogueFact icon={Ruler} label="Size" value={product.size} />
        <CatalogueFact icon={Undo2} label="Return status" value={product.returnStatus} />
        <CatalogueFact icon={Package} label="Product type" value={product.productType} />
        <CatalogueFact icon={ClipboardList} label="Procurement note" value={product.procurementNote} />
        <CatalogueFact icon={Database} label="Data source" value={product.dataSource} />
      </div>

      <div className="catalogue-hidden-actions">
        <button onClick={() => onViewDetails(product.id)} type="button">View full product detail</button>
        {onToggle ? (
          <button onClick={() => onToggle(product.id)} type="button">
            {selected ? "Selected for comparison" : "Add to comparison"}
          </button>
        ) : null}
      </div>
    </article>
  );
}

function CataloguePreviewCard({ onViewDetails, product, side = "left" }: CatalogueCardProps) {
  return (
    <article className={`catalogue-card preview-card ${side}`}>
      <span className="reviewed-badge">NHS Reviewed</span>
      <div className="catalogue-preview-main">
        <button className={`catalogue-image ${product.imageTone}`} onClick={() => onViewDetails(product.id)} type="button">
          <span aria-hidden="true" />
        </button>
        <div className="catalogue-copy">
          <h3>{product.name}</h3>
          <CatalogueMeta compact product={product} />
        </div>
      </div>
      <div className="preview-facts">
        <CatalogueFact icon={Folder} label="Category" value={product.category} />
        <CatalogueFact icon={Ruler} label="Size" value={product.size} />
        <CatalogueFact icon={Package} label="Product type" value={product.productType} />
        <CatalogueFact icon={Database} label="Data source" value={product.dataSource} />
      </div>
    </article>
  );
}

function CatalogueMeta({ compact = false, product }: { compact?: boolean; product: Product }) {
  return (
    <dl className={`catalogue-meta ${compact ? "compact-meta" : ""}`}>
      <div><dt>MPC:</dt><dd>{product.mpc}</dd></div>
      <div><dt>GTIN:</dt><dd>{product.gtin}</dd></div>
      <div><dt>Unit of issue:</dt><dd>{product.unitOfIssue}</dd></div>
      <div><dt>Brand:</dt><dd>{product.brand}</dd></div>
      <div><dt>Supplier:</dt><dd>{product.supplier}</dd></div>
    </dl>
  );
}

interface CatalogueFactProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function CatalogueFact({ icon: Icon, label, value }: CatalogueFactProps) {
  return (
    <div className="catalogue-fact">
      <Icon size={20} />
      <div>
        <strong>{label}</strong>
        <span>{value}</span>
      </div>
    </div>
  );
}
