// src/components/Feed.js

import React, { useEffect, useState } from 'react';
import './Feed.css';
import Footer from './Footer';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Feed() {
  const [diningHalls, setDiningHalls] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedHall, setSelectedHall] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5); // Number of reviews visible initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Dining Halls
        const diningHallsResponse = await fetch('/data/diningHalls.json');
        if (!diningHallsResponse.ok) {
          throw new Error('Failed to fetch dining halls');
        }
        const diningHallsData = await diningHallsResponse.json();
        setDiningHalls(diningHallsData);

        // Fetch Food Items
        const foodItemsResponse = await fetch('/data/foodItems.json');
        if (!foodItemsResponse.ok) {
          throw new Error('Failed to fetch food items');
        }
        const foodItemsData = await foodItemsResponse.json();
        setFoodItems(foodItemsData);

        // Fetch Reviews
        const reviewsResponse = await fetch('/data/reviews.json');
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter reviews based on selected dining hall
  useEffect(() => {
    if (selectedHall === 'All') {
      // Sort all reviews by time descending
      const sortedReviews = [...reviews].sort((a, b) => new Date(b.time) - new Date(a.time));
      setFilteredReviews(sortedReviews);
    } else {
      // Find food items served at the selected dining hall
      const foodIdsAtHall = foodItems
        .filter((item) => item.diningHallId === selectedHall)
        .map((item) => item.id);

      // Filter reviews for those food items
      const reviewsAtHall = reviews
        .filter((review) => foodIdsAtHall.includes(review.foodItemId))
        .sort((a, b) => new Date(b.time) - new Date(a.time));

      setFilteredReviews(reviewsAtHall);
    }

    // Reset visible count when filter changes
    setVisibleCount(5);
  }, [selectedHall, reviews, foodItems]);

  // Handle filter tab click
  const handleFilterClick = (hallId) => {
    setSelectedHall(hallId);
  };

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  // Helper function to get food item details
  const getFoodItem = (foodItemId) => {
    return foodItems.find((item) => item.id === foodItemId);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
  }

  return (
    <div className="container">
      {/* Status Bar */}
      <div className="status-bar">
        <span className="time">10:01</span>
        <span className="icons">
          <i className="fa-solid fa-battery-full"></i>
          {/* Add other status icons as needed */}
        </span>
      </div>

      {/* Header */}
      <div className="header">
        <h1 className="page-title">Feed</h1>
        <div className="filters">
          <button
            className={`filter-btn ${selectedHall === 'All' ? 'active' : ''}`}
            onClick={() => handleFilterClick('All')}
          >
            All
          </button>
          {diningHalls.map((hall) => (
            <button
              key={hall.id}
              className={`filter-btn ${selectedHall === hall.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(hall.id)}
            >
              {hall.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section with reviews */}
      <div className="section">
        {filteredReviews.slice(0, visibleCount).map((review) => {
          const foodItem = getFoodItem(review.foodItemId);
          if (!foodItem) return null; // Skip if food item not found

          return (
            <div key={review.id} className="review-item">
              <h3>{foodItem.name}</h3>
              <div className="ratings-options">
                <span className="stars">
                  {Array.from({ length: 5 }, (_, idx) => (
                    <i
                      key={idx}
                      className={
                        idx < Math.round(review.stars)
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
              <div className="content">
                {foodItem.images && foodItem.images.length > 0 && (
                  <img
                    src={`/assets/Images/${foodItem.images[0]}`}
                    alt={foodItem.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/assets/Images/default.png'; // Fallback image
                    }}
                  />
                )}
                <p>
                  {review.text.length > 100
                    ? `${review.text.substring(0, 100)}... `
                    : review.text}
                  {review.text.length > 100 && (
                    <Link to={`/food-item-details/${foodItem.id}`}>Read more</Link>
                  )}
                </p>
              </div>
              <div className="location-time">
                <span>{diningHalls.find((hall) => hall.id === foodItem.diningHallId)?.name}</span>
                <span>{new Date(review.time).toLocaleString()}</span>
              </div>
            </div>
          );
        })}

        {/* Load More Button */}
        {visibleCount < filteredReviews.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        )}

        {/* No Reviews Message */}
        {filteredReviews.length === 0 && (
          <div className="no-reviews">No reviews available for this dining hall.</div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Feed;