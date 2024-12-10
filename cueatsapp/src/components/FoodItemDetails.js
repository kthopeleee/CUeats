// src/components/FoodItemDetails.js

import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import './FoodItemDetails.css';
import Footer from './Footer';

// Import custom hooks
import useFoodItem from '../hooks/useFoodItem';
import useReviewsForFoodItem from '../hooks/useReviewsForFoodItem';

function FoodItemDetails() {
  const { foodItemId } = useParams(); // Get foodItemId from URL
  const { foodItem, loading: foodLoading, error: foodError } = useFoodItem(foodItemId);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviewsForFoodItem(foodItemId);

  if (foodLoading || reviewsLoading) {
    return <div className="container">Loading...</div>;
  }

  if (foodError) {
    return <div className="container">Error: {foodError.message}</div>;
  }

  if (reviewsError) {
    return <div className="container">Error: {reviewsError.message}</div>;
  }

  if (!foodItem) {
    return (
      <div className="container">
        <Link to="/" className="back-link">&lt; Home</Link>
        <div className="error-message">Food item not found.</div>
        <Footer />
      </div>
    );
  }

  // Calculate average rating and total ratings (for static display)
  const averageRating = foodItem.rating.toFixed(1);
  const totalRatings = reviews.length; // Alternatively, use a fixed number if desired

  return (
    <div className="container">
      {/* Back Navigation */}
      <div className="nav-back">
        <Link to={`/dining-hall/${foodItem.diningHallId}`} className="back-link">&lt; {foodItem.diningHallName}</Link>
      </div>

      {/* Food Image */}
      <div className="food-image-container">
        <img
          src={`/assets/Dining_Hall_Images/${foodItem.images[0]}`}
          alt={foodItem.name}
          className="food-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/assets/Dining_Hall_Images/default.png'; // Fallback image
          }}
        />
      </div>

      {/* Food Details */}
      <div className="food-details">
        <div className="food-title-container">
          <div className="food-title">{foodItem.name}</div>
          {/* Wrap the Review button with Link */}
          <Link to={`/review/${foodItem.id}`} className="review-link">
            <button className="review-button">Review</button>
          </Link>
        </div>
        <div className="ratings">
          <span className="stars">
            {Array.from({ length: 5 }, (_, idx) => (
              <i
                key={idx}
                className={
                  idx < Math.round(foodItem.rating)
                    ? 'fa-solid fa-star'
                    : 'fa-regular fa-star'
                }
              ></i>
            ))}
          </span>
          <span className="rating-score">{averageRating}</span>
          <span className="total-ratings">({totalRatings} ratings)</span>
        </div>
        <div className="food-tags">
          <p>Contains <span className="tag">{foodItem.allergies.join(', ')}</span></p>
          <p>Reviews mention <span className="tag">{foodItem.tags.join(', ')}</span></p>
        </div>
      </div>

      <hr className="divider" />

      {/* Reviews Section */}
      <div className="reviews-header">
        Reviews ({totalRatings})
      </div>
      <div className="sort-options">↑↓ Recent</div>

      {/* Render Reviews */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-stars-container">
              <div className="review-stars">
                {Array.from({ length: 5 }, (_, idx) => (
                  <i
                    key={idx}
                    className={
                      idx < review.stars
                        ? 'fa-solid fa-star'
                        : 'fa-regular fa-star'
                    }
                  ></i>
                ))}
              </div>
              <div className="ratings-options">
                <a href="#"><i className="fa-regular fa-heart"></i></a>
                <a href="#"><i className="fa-solid fa-share-nodes"></i></a>
              </div>
            </div>
            <div className="review-text">{review.text}</div>
            <div className="review-footer">
              <span>{new Date(review.time).toLocaleString()}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}

      <hr className="divider" />

      {/* Navigation Bar */}
      <Footer />
    </div>
  );
}

export default FoodItemDetails;