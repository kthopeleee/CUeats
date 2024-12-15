// src/components/RatingReview.js

import React from 'react';
import './RatingReview.css'; // Create this CSS file for styling

function RatingReview({ rating, setRating }) {
  return (
    <div className="rating-review">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? 'filled' : 'empty'}`}
          onClick={() => setRating(star)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') setRating(star);
          }}
          role="button"
          tabIndex={0}
          aria-label={`${star} Star${star > 1 ? 's' : ''}`}
        >
          <i className="fa-solid fa-star"></i>
        </span>
      ))}
    </div>
  );
}

export default RatingReview;