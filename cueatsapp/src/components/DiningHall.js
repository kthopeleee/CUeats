import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams
import './DiningHall.css';
import Footer from './Footer';

import '@fortawesome/fontawesome-free/css/all.min.css';

import useDiningHall from '../hooks/useDiningHall';
import useFoodItems from '../hooks/useFoodItems';
import useReviews from '../hooks/useReviews';

function DiningHall() {
  const { diningHallId } = useParams(); // Get diningHallId from URL
  const { diningHall, loading: hallLoading, error: hallError } = useDiningHall(diningHallId);
  const { foodItems, loading: foodLoading, error: foodError } = useFoodItems(diningHallId);
  const foodItemIds = foodItems.map((item) => item.id);
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(foodItemIds);

  // State for selected meal time filter
  const [selectedMeal, setSelectedMeal] = useState('All');

  useEffect(() => {
    console.log('Dining Hall ID:', diningHallId);
    console.log('Dining Hall Data:', diningHall);
    console.log('Food Items:', foodItems);
    console.log('Reviews:', reviews);
  }, [diningHallId, diningHall, foodItems, reviews]);

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

  // Function to filter dishes based on selected meal time
  const getFilteredFoodItems = () => {
    if (selectedMeal === 'All') {
      return foodItems;
    }
    return foodItems.filter((item) => item.mealTime.includes(selectedMeal));
  };

  const filteredFoodItems = getFilteredFoodItems();

  return (
    <div className="container">
      <div className="header">
        {/* Back Navigation */}
        <Link to="/" className="back-button">&lt; Home</Link>
        {/* Dining Hall Title */}
        <div className="header-title">{diningHall.name}</div>
        {/* Open Until */}
        <div className="header-subtitle">Open until {diningHall.timesOpen.dinner[1]}</div>
        {/* Horizontally Scrollable Filter Tabs */}
        <div className="tabs">
          {/* Breakfast */}
          {diningHall.timesOpen.breakfast[0] && diningHall.timesOpen.breakfast[1] && (
            <button
              className={`tab-button ${selectedMeal === 'Breakfast' ? 'active' : ''}`}
              onClick={() => setSelectedMeal('Breakfast')}
              aria-label={`Filter for Breakfast (Open from ${diningHall.timesOpen.breakfast[0]} to ${diningHall.timesOpen.breakfast[1]})`}
            >
              Breakfast<br />
              <span className="tab-time">{diningHall.timesOpen.breakfast[0]} - {diningHall.timesOpen.breakfast[1]}</span>
            </button>
          )}
          {/* Lunch */}
          {diningHall.timesOpen.lunch[0] && diningHall.timesOpen.lunch[1] && (
            <button
              className={`tab-button ${selectedMeal === 'Lunch' ? 'active' : ''}`}
              onClick={() => setSelectedMeal('Lunch')}
              aria-label={`Filter for Lunch (Open from ${diningHall.timesOpen.lunch[0]} to ${diningHall.timesOpen.lunch[1]})`}
            >
              Lunch<br />
              <span className="tab-time">{diningHall.timesOpen.lunch[0]} - {diningHall.timesOpen.lunch[1]}</span>
            </button>
          )}
          {/* Dinner */}
          {diningHall.timesOpen.dinner[0] && diningHall.timesOpen.dinner[1] && (
            <button
              className={`tab-button ${selectedMeal === 'Dinner' ? 'active' : ''}`}
              onClick={() => setSelectedMeal('Dinner')}
              aria-label={`Filter for Dinner (Open from ${diningHall.timesOpen.dinner[0]} to ${diningHall.timesOpen.dinner[1]})`}
            >
              Dinner<br />
              <span className="tab-time">{diningHall.timesOpen.dinner[0]} - {diningHall.timesOpen.dinner[1]}</span>
            </button>
          )}
          {/* All */}
          <button
            className={`tab-button ${selectedMeal === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedMeal('All')}
            aria-label="Show all dishes"
          >
            All<br />
            <span className="tab-time">All Meals</span>
          </button>
        </div>
      </div>

      <div className="section">
        {/* Iterate through filtered food items */}
        {filteredFoodItems.map((item) => {
          const itemReviews = getReviewsForFoodItem(item.id);
          const ratingText = `${item.rating.toFixed(1)} (${itemReviews.length} rating${itemReviews.length !== 1 ? 's' : ''})`;

          return (
            <Link to={`/food-item-details/${item.id}`} key={item.id} className="dish-link">
              <div className="dish">
                <div className={`images-row images-row-${item.images.length}`}>
                  {item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`/assets/Images/${img}`} // Updated path
                      alt={item.name}
                      className="dish-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/Images/default.png'; // Updated fallback
                      }}
                    />
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
                    <span>
                      “{itemReviews[itemReviews.length - 1].text.substring(0, 65)}...”
                      <span className="read-more">Read more</span>
                    </span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        {/* No Dishes Message */}
        {filteredFoodItems.length === 0 && (
          <div className="no-dishes-message">No dishes available for the selected meal time.</div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DiningHall;