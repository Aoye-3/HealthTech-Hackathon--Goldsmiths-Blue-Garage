import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  ShieldCheck,
  Star,
  Stethoscope,
  Users
} from "lucide-react";
import { MetricCard } from "../components/procurement/MetricCard";
import { productEvidenceProfiles, products } from "../data/procurementData";
import type { Product, Review, ReviewDetail } from "../types";
import { buildPeerEvidencePath, getProductIdFromPath, getReviewIdFromPath, money, navigateTo } from "../utils/routing";

interface ClinicianReviewPageProps {
  pathname: string;
}

const contextItems = [
  { icon: Building2, label: "Organisation", key: "organisation" },
  { icon: Stethoscope, label: "Reviewer role", key: "role" },
  { icon: Users, label: "Clinical setting", key: "clinicalSetting" },
  { icon: CalendarDays, label: "Usage period", key: "usagePeriod" },
  { icon: ClipboardCheck, label: "Product use", key: "productUse" },
  { icon: ShieldCheck, label: "Relevant pathway", key: "relevantPathway" }
];

function buildReviewDetail(review: Review, product: Product): ReviewDetail {
  return review.detail ?? {
    confidence: "High",
    evidenceStrength: "Strong",
    usagePeriod: "6 months",
    clinicalSetting: "Primary care",
    productUse: product.category,
    relevantPathway: "Community-based respiratory and post-discharge care",
    breakdown: [
      { label: "Clinical usefulness", value: "4.9 / 5", score: 4.9 },
      { label: "Ease of adoption", value: "4.7 / 5", score: 4.7 },
      { label: "Supplier reliability", value: "4.6 / 5", score: 4.6 },
      { label: "Value for money", value: "4.8 / 5", score: 4.8 },
      { label: "Would buy again", value: "Yes" }
    ],
    relevanceScore: 87,
    relevanceReasons: [
      "Same product category",
      "Similar primary care procurement context",
      "Verified product use",
      "Positive implementation feedback",
      "High clinician rating"
    ],
    impactMetrics: [
      { label: "Diagnostic workload", value: "Reduced", tone: "green" },
      { label: "Staff adoption", value: "High", tone: "green" },
      { label: "Implementation time", value: "Under 1 month", tone: "green" },
      { label: "Reorder likelihood", value: "High", tone: "green" },
      { label: "Similar organisations using it", value: `${Math.max(8, Math.round(product.organisationsUsing / 18))} PCNs`, tone: "blue" }
    ],
    limitations: [
      "Based on one organisation's experience",
      "Long-term cost data is limited",
      "Clinical outcome data was not formally audited",
      "Applicability may vary between PCNs and hospital trusts"
    ],
    approvalEvidence: `Verified peer feedback from ${review.organisation} indicates strong usability and reported reduction in diagnostic workload. This evidence supports product suitability in similar primary care settings.`
  };
}

function getContextValue(key: string, review: Review, detail: ReviewDetail) {
  if (key === "organisation") return review.organisation;
  if (key === "role") return review.role;
  if (key === "clinicalSetting") return detail.clinicalSetting;
  if (key === "usagePeriod") return detail.usagePeriod;
  if (key === "productUse") return detail.productUse;
  return detail.relevantPathway;
}

export function ClinicianReviewPage({ pathname }: ClinicianReviewPageProps) {
  const productId = getProductIdFromPath(pathname);
  const reviewId = getReviewIdFromPath(pathname);
  const product = products.find((item) => item.id === productId) ?? products[1];
  const profile = productEvidenceProfiles[product.id] ?? productEvidenceProfiles[products[1].id];
  const review = profile.reviews.find((item) => item.id === reviewId) ?? profile.reviews[0];
  const detail = buildReviewDetail(review, product);
  const initials = review.clinician.split(" ").map((part) => part[0]).join("");

  return (
    <div className="page-stack clinician-review-page">
      <section className="clinician-review-header">
        <div>
          <button className="link-button" type="button" onClick={() => navigateTo(buildPeerEvidencePath(product.id))}>
            Back to peer evidence
          </button>
          <h1>Clinician Review Detail</h1>
          <p>Verified peer evidence from {review.clinician}, {review.role} at {review.organisation}.</p>
        </div>
        <span className="verified-review-badge">
          <BadgeCheck size={16} />
          Verified Review
        </span>
      </section>

      <section className="clinician-profile-card">
        <div className="clinician-avatar">{initials}</div>
        <div>
          <h2>{review.clinician}</h2>
          <p>{review.role} - {review.organisation}</p>
          <div className="clinician-tags">
            <span>Verified NHS clinician</span>
            <span>Verified purchase</span>
            <span>Used for {detail.usagePeriod}</span>
            <span>{detail.clinicalSetting} setting</span>
          </div>
        </div>
        <div className="clinician-rating">
          <span>Overall rating</span>
          <strong>{review.rating.toFixed(1)} / 5</strong>
          <div aria-label={`${review.rating.toFixed(1)} out of 5 stars`}>
            {Array.from({ length: 5 }, (_, index) => (
              <Star key={index} size={17} fill="currentColor" />
            ))}
          </div>
          <small>Review confidence: {detail.confidence}</small>
          <small>Evidence strength: {detail.evidenceStrength}</small>
        </div>
      </section>

      <div className="clinician-review-grid">
        <section className="clinician-comment-card">
          <h2>Clinician comment</h2>
          <blockquote>"{review.quote}"</blockquote>
          <p>This review was submitted after verified product use within {review.organisation}.</p>
        </section>

        <section className="reviewed-product-card">
          <h2>Reviewed product</h2>
          <div className="reviewed-product-main">
            <div className={`product-image ${product.imageTone}`}><span>{product.brand.slice(0, 2).toUpperCase()}</span></div>
            <div>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <div className="clinician-tags">
                <span>NHS reviewed</span>
                <span>{product.returnStatus}</span>
                <span>Supplier quote available</span>
              </div>
            </div>
          </div>
          <div className="review-product-metrics">
            <MetricCard label="AI match" value={`${product.fitScore}%`} detail="Very strong fit" tone="green" />
            <MetricCard label="Clinician rating" value={`${product.rating} / 5`} detail={`${product.verifiedReviews} verified reviews`} tone="amber" />
            <MetricCard label="Price range" value={`${money(product.benchmarkLow)} - ${money(product.benchmarkHigh)}`} detail="Based on supplier quotes" tone="blue" />
          </div>
        </section>

        <section className="review-context-card">
          <h2>Use case context</h2>
          <div className="review-context-grid">
            {contextItems.map(({ icon: Icon, key, label }) => (
              <div key={label}>
                <Icon size={18} />
                <span>{label}</span>
                <strong>{getContextValue(key, review, detail)}</strong>
              </div>
            ))}
          </div>
          <p className="review-context-note">The product was used to support clinicians managing airway-related care in a primary care environment.</p>
        </section>

        <section className="review-breakdown-card">
          <h2>Structured review breakdown</h2>
          {detail.breakdown.map(({ label, score, value }) => (
            <div className="breakdown-row" key={label}>
              <ClipboardCheck size={17} />
              <span>{label}</span>
              <div className="breakdown-score">
                {score ? (
                  <span aria-hidden="true">
                    {Array.from({ length: 5 }, (_, index) => (
                      <Star key={index} size={13} fill="currentColor" />
                    ))}
                  </span>
                ) : null}
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </section>

        <section className="review-relevance-card">
          <h2>Relevance to current request</h2>
          <div className="relevance-summary">
            <div className="relevance-ring">
              <strong>{detail.relevanceScore}%</strong>
              <span>Evidence relevance</span>
            </div>
            <ul>
              {detail.relevanceReasons.map((reason) => (
                <li key={reason}>
                  <CheckCircle2 size={15} />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          <div className="evidence-gap">
            <AlertTriangle size={17} />
            <p><strong>Potential evidence gap</strong> The reviewer is from a PCN setting. Additional hospital-based evidence may still be useful before final approval.</p>
          </div>
        </section>

        <section className="reported-impact-card">
          <h2>Reported impact</h2>
          <div className="impact-grid">
            {detail.impactMetrics.map((metric) => (
              <div className={`impact-tile ${metric.tone ?? "blue"}`} key={metric.label}>
                <Clock3 size={16} />
                <span>{metric.label}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}
          </div>
          <p>The review indicates that the product was useful in reducing diagnostic workload and was adopted smoothly within the reviewer's primary care setting.</p>
        </section>

        <section className="review-limitations-card">
          <h2>Limitations</h2>
          <ul>
            {detail.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
        </section>

        <section className="review-approval-card">
          <h2>Suggested evidence for approval pack</h2>
          <div>
            <FileText size={20} />
            <p>{detail.approvalEvidence}</p>
          </div>
          <div className="approval-support-tags">
            <span>Clinical suitability</span>
            <span>Peer evidence</span>
            <span>Implementation confidence</span>
            <span>Staff adoption</span>
          </div>
          <div className="review-action-row">
            <button className="primary" type="button">Add to Approval Pack</button>
            <button className="secondary" type="button">Request Peer Conversation</button>
            <button className="secondary" type="button">Compare with Other Reviews</button>
          </div>
        </section>
      </div>
    </div>
  );
}
