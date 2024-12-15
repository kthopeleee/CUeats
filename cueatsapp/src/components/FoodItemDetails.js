// src/components/FoodItemDetails.js

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './FoodItemDetails.css';
import Footer from './Footer';
import useFoodItem from '../hooks/useFoodItem';
import useReviewsForFoodItem from '../hooks/useReviewsForFoodItem';

function FoodItemDetails() {
  const { foodItemId } = useParams();
  const { foodItem, loading: foodLoading, error: foodError } = useFoodItem(foodItemId);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviewsForFoodItem(foodItemId);

  // Combine static and dynamic reviews
  const [staticReviews, setStaticReviews] = useState([]);

  useEffect(() => {
    const fetchStaticReviews = async () => {
      try {
        const response = await fetch('/data/reviews.json');
        if (!response.ok) throw new Error('Failed to fetch static reviews');
        const data = await response.json();
        setStaticReviews(data.filter((review) => review.food_item_id === foodItemId));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchStaticReviews();
  }, [foodItemId]);

  const combinedReviews = [...staticReviews, ...reviews];

  const sortedReviews = combinedReviews.sort((a, b) => new Date(b.time) - new Date(a.time));

  if (foodLoading || reviewsLoading) return <div className="container">Loading...</div>;
  if (foodError || reviewsError) return <div className="container">Error: {foodError?.message || reviewsError?.message}</div>;
  if (!foodItem) return <div className="container">Food item not found.</div>;

  return (
    <div className="container">
      {/* Back Navigation */}
      <div className="nav-back">
        <Link to={`/dining-hall/${foodItem.diningHallId}`} className="back-link">
          &lt; {foodItem.diningHallName}
        </Link>
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
            e.target.src = '/assets/Images/default.png'; // Fallback image
          }}
        />
      </div>

      {/* Food Details */}
      <div className="food-details">
        <div className="food-title-container">
          <div className="food-title">{foodItem.name}</div>

          {/* Add Blue Review Button */}
          <Link to={`/review/${foodItemId}`} className="review-button-link">
            <button className="review-button">Review</button>
          </Link>
        </div>
        <div className="ratings">
          <span className="stars">
            {Array.from({ length: 5 }, (_, idx) => (
              <i
                key={idx}
                className={idx < Math.round(calculateAverageRating(combinedReviews)) ? 'fa-solid fa-star' : 'fa-regular fa-star'}
              ></i>
            ))}
          </span>
          <span className="rating-score">{calculateAverageRating(combinedReviews).toFixed(1)}</span>
          <span className="total-ratings">&nbsp;({combinedReviews.length} rating{combinedReviews.length !== 1 ? 's' : ''})</span>
        </div>
        <div className="food-tags">
          <p>
            Contains <span className="tag">{foodItem.allergies.join(', ')}</span>
          </p>
          <p>
            Reviews mention <span className="tag">{foodItem.tags.join(', ')}</span>
          </p>
        </div>
      </div>

      <hr className="divider" />

      {/* Reviews Section */}
      <div className="section">
        <div className="reviews-header"> Reviews ({combinedReviews.length}) </div>
        <div className="sort-options">↑↓ Recent</div>
        
        {/*Render Reviews*/}
          {sortedReviews.map((review) => (
            <div key={`${review.id}-${review.time}`} className="review-item">
              <div className="ratings-options">
                <span className="stars">
                  {Array.from({ length: 5 }, (_, idx) => (
                    <i
                      key={idx}
                      className={idx < Math.round(review.stars) ? 'fa-solid fa-star' : 'fa-regular fa-star'}
                    ></i>
                  ))}
                </span>
                <span className="actions">
                    <i className="fa-regular fa-heart"></i>
                    <i className="fa-solid fa-share-nodes"></i>
                </span>
              </div>
              
              <p className="content">
                {review.impressions && review.impressions.length > 0 && (
                  <>
                    <text className="tag">{review.impressions.join(', ')}</text>
                    <br/>
                  </>
                )}
                {review.text}</p>
              
              <div className="location-time">
                <span>{new Date(review.time).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit', year: 'numeric'})}</span>
              </div>
            </div>
          ))}
        </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.stars, 0);
  return total / reviews.length;
};

export default FoodItemDetails;