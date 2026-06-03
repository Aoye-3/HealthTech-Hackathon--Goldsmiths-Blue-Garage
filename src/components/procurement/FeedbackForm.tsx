import { Send, Star } from "lucide-react";
import { useState } from "react";

export function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="feedback-panel">
      <h3>Share your feedback</h3>
      <p>Your insights drive better outcomes and help improve products used across the PCN.</p>
      <div className="stars" aria-label="Rate this product">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            aria-label={`Rate ${value} stars`}
            className={rating >= value ? "active" : ""}
            key={value}
            onClick={() => setRating(value)}
            type="button"
          >
            <Star size={22} fill={rating >= value ? "currentColor" : "none"} />
          </button>
        ))}
        <span>{rating} / 5</span>
      </div>
      <label>
        Add implementation note
        <textarea
          maxLength={1000}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Share what is working well, challenges faced, and any tips for successful implementation."
          value={note}
        />
      </label>
      <div className="feedback-actions">
        <button className="primary" onClick={() => setSubmitted(true)} type="button">
          <Send size={16} />
          Submit feedback
        </button>
        <button className="secondary" type="button">
          Create case study
        </button>
      </div>
      {submitted ? <p className="success-note">Feedback saved. The outcome record is ready for reporting.</p> : null}
    </section>
  );
}
