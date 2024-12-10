// src/components/Review.js

import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './Review.css';
import Footer from './Footer';
import { addReview } from '../services/reviewService';
import RatingReview from './RatingReview'; // Ensure correct path

function Review() {
  const { foodItemId } = useParams();
  const navigate = useNavigate();

  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');
  const [impressions, setImpressions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const impressionOptions = ["Fresh", "Tasty", "Convenient", "Stale", "Bland", "Undercooked"];

  const handleImpressionClick = (impression) => {
    setImpressions((prev) =>
      prev.includes(impression)
        ? prev.filter((item) => item !== impression)
        : [...prev, impression]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (stars === 0) {
      alert('Please select a star rating.');
      return;
    }

    setLoading(true);
    setError(null);

    const newReview = {
      food_item_id: foodItemId,
      stars,
      text,
      impressions,
      time: new Date().toISOString()
    };

    try {
      await addReview(newReview);
      alert('Review submitted successfully!');
      navigate(`/food-item-details/${foodItemId}`);
    } catch (err) {
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-container">
      {/* Header */}
      <header className="review-header">
        <Link to={`/food-item-details/${foodItemId}`} className="back-button">
          <i className="fa-solid fa-angle-left"></i> Back to Review
        </Link>
      </header>

      {/* Review Form */}
      <div className="review-form-container">
        <h2 className="form-title">Submit Your Review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          {/* Rating Section */}
          <div className="form-group">
            <label className="form-label">Rating:</label>
            <RatingReview rating={stars} setRating={setStars} />
          </div>

          {/* Impressions Section */}
          <div className="form-group">
            <label className="form-label">Impressions:</label>
            <div className="impression-tags">
              {impressionOptions.map((impression) => (
                <button
                  type="button"
                  key={impression}
                  className={`impression-tag ${impressions.includes(impression) ? 'selected' : ''}`}
                  onClick={() => handleImpressionClick(impression)}
                >
                  {impression}
                </button>
              ))}
            </div>
          </div>

          {/* Review Text Section */}
          <div className="form-group">
            <label className="form-label">Review:</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              placeholder="Add more details here..."
              className="review-textarea"
            ></textarea>
          </div>

          {/* Add Photo Button */}
          <button type="button" className="add-photo-button">
            <i className="fa-solid fa-circle-plus"></i> <span>Add Photo</span>
          </button>

          {/* Submit Button */}
          <button type="submit" className="submit-review-button" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>

          {/* Error Message */}
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>

      {/* Footer */}
      <Footer />  
    </div>
  );
}

export default Review;