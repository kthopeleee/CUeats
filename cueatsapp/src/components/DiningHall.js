// src/components/DiningHall.js

import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import './DiningHall.css';
import Footer from './Footer';

// Import custom hooks
import useDiningHall from '../hooks/useDiningHall';
import useFoodItems from '../hooks/useFoodItems';
import useReviews from '../hooks/useReviews';

function DiningHall() {
  const { diningHallId } = useParams(); // Get diningHallId from URL
  const { diningHall, loading: hallLoading, error: hallError } = useDiningHall(diningHallId);
  const { foodItems, loading: foodLoading, error: foodError } = useFoodItems(diningHallId);
  const foodItemIds = foodItems.map((item) => item.id);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(foodItemIds);

  if (hallLoading || foodLoading || reviewsLoading) {
    return <div className="container">Loading...</div>;
  }

  if (hallError) {
    return <div className="container">Error: {hallError.message}</div>;
  }

  if (foodError) {
    return <div className="container">Error: {foodError.message}</div>;
  }

  if (reviewsError) {
    return <div className="container">Error: {reviewsError.message}</div>;
  }

  if (!diningHall) {
    return (
      <div className="container">
        <Link to="/" className="back-button">&lt; Home</Link>
        <div className="error-message">Dining Hall not found.</div>
        <Footer />
      </div>
    );
  }

  // Function to get reviews for a specific food item
  const getReviewsForFoodItem = (foodItemId) => {
    return reviews.filter((review) => review.foodItemId === foodItemId);
  };

  return (
    <div className="container">
      <div className="header">
        {/* Back Navigation */}
        <Link to="/" className="back-button">&lt; Home</Link>
        {/* Dining Hall Title */}
        <div className="header-title">{diningHall.name}</div>
        {/* Open Until */}
        <div className="header-subtitle">Open until {diningHall.timesOpen.dinner[1]}</div>
        {/* Operating Times Tabs */}
        <div className="tabs">
          {/* Breakfast */}
          {diningHall.timesOpen.breakfast[0] && diningHall.timesOpen.breakfast[1] && (
            <div className="tab breakfast">
              <a href="#breakfast">
                Breakfast
                <div className="tab-times">{diningHall.timesOpen.breakfast[0]} - {diningHall.timesOpen.breakfast[1]}</div>
              </a>
            </div>
          )}
          {/* Lunch */}
          {diningHall.timesOpen.lunch[0] && diningHall.timesOpen.lunch[1] && (
            <div className="tab lunch">
              <a href="#lunch">
                Lunch
                <div className="tab-times">{diningHall.timesOpen.lunch[0]} - {diningHall.timesOpen.lunch[1]}</div>
              </a>
            </div>
          )}
          {/* Dinner */}
          {diningHall.timesOpen.dinner[0] && diningHall.timesOpen.dinner[1] && (
            <div className="tab dinner">
              <a href="#dinner">
                Dinner
                <div className="tab-times">{diningHall.timesOpen.dinner[0]} - {diningHall.timesOpen.dinner[1]}</div>
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="section">
        {/* Iterate through food items */}
        {foodItems.map((item) => {
          const itemReviews = getReviewsForFoodItem(item.id);
          const ratingText = `${item.rating} (${itemReviews.length} ratings)`;

          return (
            <Link to={`/food-item-details/${item.id}`} key={item.id} className="dish-link">
              <div className="dish">
                <div className="images-row">
                  {item.images.map((img, idx) => (
                    <img key={idx} src={`/assets/Dining_Hall_Images/${img}`} alt={item.name} onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/Dining_Hall_Images/default.png';
                    }} />
                  ))}
                </div>
                <div className="dish-title">{item.name}</div>
                <div className="rating-row">
                  {Array.from({ length: 5 }, (_, idx) => (
                    <i
                      key={idx}
                      className={
                        idx < Math.round(item.rating)
                          ? 'fa-solid fa-star'
                          : 'fa-regular fa-star'
                      }
                    ></i>
                  ))}
                  <span className="rating-text">{ratingText}</span>
                </div>
                <div className="dish-info-green">{item.station} until {diningHall.timesOpen.dinner[0]}</div>
                <div className="dish-info">Contains {item.allergies.join(', ')}</div>
                {/* Optionally display a snippet of the latest review */}
                {itemReviews.length > 0 && (
                  <div className="review">
                    <span className="comment-icon">💬</span>
                    “{itemReviews[itemReviews.length - 1].text.substring(0, 50)}...”
                    <span className="read-more">Read more</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Bottom Nav */}
      <Footer />
    </div>
  );
}

export default DiningHall;