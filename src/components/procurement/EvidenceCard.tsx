import { BadgeCheck, Star } from "lucide-react";
import type { Review } from "../../types";

interface EvidenceCardProps {
  review: Review;
}

export function EvidenceCard({ review }: EvidenceCardProps) {
  return (
    <article className="evidence-card">
      <div className="review-header">
        <div className="review-avatar">{review.clinician.split(" ").map((part) => part[0]).join("")}</div>
        <div>
          <strong>{review.clinician}</strong>
          <span>{review.role} - {review.organisation}</span>
        </div>
      </div>
      <div className="rating-row compact">
        <Star size={15} fill="currentColor" />
        <strong>{review.rating.toFixed(1)} / 5</strong>
        {review.verified ? (
          <span className="verified">
            <BadgeCheck size={14} />
            Verified purchase
          </span>
        ) : null}
      </div>
      <p>"{review.quote}"</p>
    </article>
  );
}
