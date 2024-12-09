// src/components/FoodItemDetails.js

import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './FoodItemDetails.css';
import Footer from './Footer';

// Import custom hooks
import useFoodItem from '../hooks/useFoodItem';
import useReviewsForFoodItem from '../hooks/useReviewsForFoodItem';

function FoodItemDetails() {
  const { foodItemId } = useParams(); // Get foodItemId from URL
  const { foodItem, loading: foodLoading, error: foodError } = useFoodItem(foodItemId);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviewsForFoodItem(foodItemId);

  useEffect(() => {
    console.log('Food Item ID:', foodItemId);
    console.log('Food Item Data:', foodItem);
    console.log('Reviews:', reviews);
  }, [foodItemId, foodItem, reviews]);

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

  // Calculate average rating and total ratings
  const averageRating = foodItem.rating.toFixed(1);
  const totalRatings = reviews.length;

  return (
    <div className="container">
      {/* Back Navigation */}
      <div className="nav-back">
        <Link to={`/dining-hall/${foodItem.diningHallId}`} className="back-link">&lt; {foodItem.diningHallName}</Link>
      </div>

      {/* Food Image */}
      <div className="food-image-container">
        <img
          src={`/assets/Images/${foodItem.images[0]}`}
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
          <span className="total-ratings">&nbsp;({totalRatings} ratings)</span>
        </div>
        <div className="food-tags">
          <p>Contains <span className="tag">{foodItem.allergies.join(', ')}</span></p>
          <p>Reviews mention <span className="tag">{foodItem.tags.join(', ')}</span></p>
        </div>
      </div>

      <hr className="divider" />

      <div className="section">
        {/* Reviews Section */}
        <div className="reviews-header">
          Reviews ({totalRatings})
        </div>
        <div className="sort-options">↑↓ Recent</div>

        {/* Render Reviews */}
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="ratings-options">
                <span className="stars">
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
                </span>
                <span className="actions">
                    <i className="fa-regular fa-heart"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                </span>
              </div>
              <div className="content">{review.text}</div>
              <div className="location-time">
              <span>{new Date(review.time).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: 'numeric'})}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}

      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FoodItemDetails;