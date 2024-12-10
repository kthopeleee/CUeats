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
    <div className="container">
      {/* Header */}
      <header>
        <Link to={`/food-item-details/${foodItemId}`} className="back">
          <i className="fa-solid fa-angle-left"></i> Back to Review
        </Link>
      </header>

      {/* Review Form */}
      <div className="page-container">
        <div className="add-review-container">
          <h2>Submit Your Review</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label>Rating:</label>
              <div className="stars-input">
                {Array.from({ length: 5 }, (_, idx) => (
                  <i
                    key={idx}
                    className={idx < stars ? 'fa-solid fa-star active' : 'fa-regular fa-star'}
                    onClick={() => setStars(idx + 1)}
                    style={{ cursor: 'pointer', color: '#ffc107', marginRight: '5px' }}
                  ></i>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Impressions:</label>
              <div className="impression-buttons">
                {impressionOptions.map((impression) => (
                  <button
                    type="button"
                    key={impression}
                    className={`impression-button ${impressions.includes(impression) ? 'selected' : ''}`}
                    onClick={() => handleImpressionClick(impression)}
                  >
                    {impression}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Review:</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                placeholder="Add more details here..."
              ></textarea>
            </div>
            <button type="button" className="add-btn">
              <i className="fa-solid fa-circle-plus"></i> <span>Add photo</span>
            </button>
            <button type="submit" className="review-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />  
    </div>
  );
}

export default Review;