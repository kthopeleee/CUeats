// src/components/DiningHall.js

import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import './DiningHall.css';
import Footer from './Footer';
import useDiningHall from '../hooks/useDiningHall';
import useFoodItems from '../hooks/useFoodItems';
import useReviews from '../hooks/useReviews';

function DiningHall() {
  const { diningHallId } = useParams(); // Get diningHallId from URL
  console.log('DiningHall ID:', diningHallId);
  debugger;

  // Fetch dining hall data
  const { diningHall, loading: hallLoading, error: hallError } = useDiningHall(diningHallId);
  console.log('DiningHall Data:', diningHall);
  debugger;

  // Fetch food items
  const { foodItems, loading: foodLoading, error: foodError } = useFoodItems(diningHallId);
  console.log('Food Items:', foodItems);
  debugger;

  // Define selectedMeal state at the top level
  const [selectedMeal, setSelectedMeal] = useState('All');
  console.log('Selected Meal:', selectedMeal);
  debugger;

  // Memoize foodItemIds to prevent unnecessary re-renders
  const foodItemIds = useMemo(() => {
    console.log('Memoizing foodItemIds');
    return foodItems.map((item) => item.id);
  }, [foodItems]);
  console.log('Food Item IDs:', foodItemIds);
  debugger;

  // Fetch reviews
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(foodItemIds);
  console.log('Reviews:', reviews);
  debugger;

  // State for dynamic closing/opening time
  const [currentStatus, setCurrentStatus] = useState({ message: '', isOpen: false });
  console.log('Current Status:', currentStatus);
  debugger;

  // Combine static and dynamic reviews
  const [staticReviews, setStaticReviews] = useState([]);
  console.log('Static Reviews:', staticReviews);
  debugger;

  useEffect(() => {
    console.log('Fetching static reviews');
    const fetchStaticReviews = async () => {
      try {
        const response = await fetch('/data/reviews.json');
        if (!response.ok) {
          throw new Error('Failed to fetch static reviews');
        }
        const data = await response.json();
        console.log('Fetched static reviews:', data);
        setStaticReviews(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStaticReviews();
  }, []);

  // Combine static and dynamic reviews
  const combinedReviews = useMemo(() => {
    console.log('Combining static and dynamic reviews');
    return [...staticReviews, ...reviews];
  }, [staticReviews, reviews]);
  console.log('Combined Reviews:', combinedReviews);
  debugger;

  useEffect(() => {
    if (diningHall) {
      console.log('Determining dining hall status');
      determineDiningHallStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diningHall]);

  const determineDiningHallStatus = () => {
    const now = new Date();
    const mealTimes = diningHall.timesOpen;

    // Define the order of meals
    const mealOrder = ['Breakfast', 'Lunch', 'Dinner'];

    // Iterate through meals to find current or next meal time
    for (let meal of mealOrder) {
      const [openTimeStr, closeTimeStr] = mealTimes[meal.toLowerCase()];
      console.log(`Checking ${meal}: ${openTimeStr} - ${closeTimeStr}`);

      // Check if times are provided and valid
      if (!openTimeStr || !closeTimeStr) {
        console.log(`${meal} times are not defined.`);
        continue; // Skip this meal if times are not defined
      }

      // Parse times
      const openTime = parseTimeString(openTimeStr, now);
      const closeTime = parseTimeString(closeTimeStr, now);

      console.log(`Parsed ${meal} times: Open at ${openTime}, Close at ${closeTime}`);

      // Check if parsing was successful
      if (isNaN(openTime) || isNaN(closeTime)) {
        console.warn(`Invalid times for ${meal}: ${openTimeStr} - ${closeTimeStr}`);
        continue; // Skip invalid times
      }

      // Check if current time is within this meal time
      if (now >= openTime && now <= closeTime) {
        // Currently open for this meal
        console.log(`${diningHall.name} is currently open for ${meal}.`);
        setCurrentStatus({
          message: `Closes at ${formatTime(closeTime)}`,
          isOpen: true
        });
        return;
      } else if (now < openTime) {
        // Not yet open for this meal
        console.log(`${diningHall.name} is not yet open for ${meal}.`);
        setCurrentStatus({
          message: `Opens at ${formatTime(openTime)}`,
          isOpen: false
        });
        return;
      }
    }

    // If no current or next meal time is found, set to "Closed for the day"
    console.log(`${diningHall.name} is closed for the day.`);
    setCurrentStatus({
      message: 'Closed for the day',
      isOpen: false
    });
  };

  // Helper function to parse time strings
  const parseTimeString = (timeStr, referenceDate) => {
    // Expected format: 'h:mm a' e.g., '9:00 AM'
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    const date = new Date(referenceDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Helper function to format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Early rendering based on loading or error states
  if (hallLoading || foodLoading || reviewsLoading) {
    console.log('Loading state detected.');
    return <div className="container">Loading...</div>;
  }

  if (hallError || foodError || reviewsError) {
    console.error('Error detected:', hallError?.message || foodError?.message || reviewsError?.message);
    return <div className="container">Error: {hallError?.message || foodError?.message || reviewsError?.message}</div>;
  }

  if (!diningHall) {
    console.warn('Dining hall not found.');
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
    return combinedReviews.filter((review) => review.food_item_id === foodItemId);
  };

  // Function to filter dishes based on selected meal time
  const getFilteredFoodItems = () => {
    if (selectedMeal === 'All') {
      return foodItems;
    }
    return foodItems.filter((item) => item.mealTime.includes(selectedMeal));
  };

  const filteredFoodItems = useMemo(getFilteredFoodItems, [selectedMeal, foodItems]);
  console.log('Filtered Food Items:', filteredFoodItems);
  debugger;

  return (
    <div className="container">
      <div className="header">
        {/* Back Navigation */}
        <Link to="/" className="back-button">&lt; Home</Link>
        {/* Dining Hall Title */}
        <div className="header-title">{diningHall.name}</div>
        {/* Open Until or Next Opening */}
        <div className={`header-subtitle ${!currentStatus.isOpen ? 'status-closed' : 'status-open'}`}>
          {currentStatus.message}
        </div>
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
          const averageRating = calculateAverageRating(itemReviews);
          const ratingText = `${averageRating.toFixed(1)} (${itemReviews.length} rating${itemReviews.length !== 1 ? 's' : ''})`;

          return (
            <Link to={`/food-item-details/${item.id}`} key={item.id} className="dish-link">
              <div className="dish">
                <div className={`images-row images-row-${item.images.length}`}>
                  {item.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={`/assets/Images/${img}`} // Ensure images are correctly placed in public/assets/Images/
                      alt={item.name}
                      className="dish-image"
                      loading="lazy" // Enable lazy loading for performance
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/Images/default.png'; // Fallback image
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
                        idx < Math.round(averageRating)
                          ? 'fa-solid fa-star'
                          : 'fa-regular fa-star'
                      }
                    ></i>
                  ))}
                  <span className="rating-text">{ratingText}</span>
                </div>
                <div className="dish-info-green">{item.station} until {diningHall.timesOpen.dinner[1]}</div>
                <div className="dish-info">Contains {item.allergies.join(', ')}</div>
                {/* Display latest review snippet */}
                {itemReviews.length > 0 && (
                  <div className="review">
                    <span className="comment-icon">💬</span>
                    <span>
                      “{itemReviews[itemReviews.length - 1].text.substring(0, 65)}...”
                      <Link to={`/food-item-details/${item.id}`} className="read-more">Read more</Link>
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

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.stars, 0);
  return total / reviews.length;
};