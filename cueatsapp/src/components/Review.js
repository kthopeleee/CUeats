// src/components/Review.js

import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useParams and useNavigate
import './Review.css';
import Footer from './Footer';
import { addReview } from '../services/reviewService'; // Assuming you have a service to handle adding reviews

function Review() {
  const { foodItemId } = useParams(); // Get foodItemId from URL
  const navigate = useNavigate(); // For navigation after submission

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
      foodItemId,
      stars,
      text,
      impressions,
      time: new Date().toISOString()
    };

    try {
      await addReview(newReview); // Implement this service to add review to your data source
      alert('Review submitted successfully!');
      navigate(`/food-item-details/${foodItemId}`);
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-container">
      {/* Header */}
      <header className="review-header">
        <Link to={`/food-item-details/${foodItemId}`} className="back-button">
           &lt; Review
        </Link>
      </header>

      {/* Review Form */}
      <div className="review-form-container">
        <h2 className="form-title">Submit a review</h2>
        <form onSubmit={handleSubmit} className="review-form">
          {/* Rating Section */}
          <div className="form-group">
            <label className="form-label">Rating</label>
            <div className="stars-input">
              {Array.from({ length: 5 }, (_, idx) => (
                <i
                  key={idx}
                  className={idx < stars ? 'fa-solid fa-star active' : 'fa-regular fa-star'}
                  onClick={() => setStars(idx + 1)}
                  aria-label={`${idx + 1} Star`}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') setStars(idx + 1);
                  }}
                ></i>
              ))}
            </div>
          </div>

          {/* Impressions Section */}
          <div className="form-group">
            <label className="form-label">Impressions</label>
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
            {/*<label className="form-label">Review:</label>*/}
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
            {loading ? 'Submitting...' : 'Review'}
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