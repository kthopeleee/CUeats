// src/components/Feed.js

import React, { useEffect, useState, useMemo } from 'react';
import './Feed.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import useReviews from '../hooks/useReviews';
import useFoodItems from '../hooks/useFoodItems';
import useDiningHall from '../hooks/useDiningHall';

function Feed() {
  const [diningHalls, setDiningHalls] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedHall, setSelectedHall] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Dining Halls
  useEffect(() => {
    const fetchDiningHalls = async () => {
      try {
        const response = await fetch('/data/diningHalls.json');
        if (!response.ok) {
          throw new Error('Failed to fetch dining halls');
        }
        const data = await response.json();
        setDiningHalls(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDiningHalls();
  }, []);

  // Fetch Food Items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('/data/foodItems.json');
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        setFoodItems(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFoodItems();
  }, []);

  // Memoize foodItemIds to prevent unnecessary re-renders
  const foodItemIds = useMemo(() => {
    if (selectedHall === 'All') {
      return foodItems.map((item) => item.id);
    }
    return foodItems
      .filter((item) => item.diningHallId === selectedHall)
      .map((item) => item.id);
  }, [foodItems, selectedHall]);

  // Fetch Reviews using custom hook
  const { reviews, loading: reviewsLoading, error: reviewsError } = useReviews(foodItemIds);

  // Fetch Static Reviews from JSON
  const [staticReviews, setStaticReviews] = useState([]);

  useEffect(() => {
    const fetchStaticReviews = async () => {
      try {
        const response = await fetch('/data/reviews.json');
        if (!response.ok) {
          throw new Error('Failed to fetch static reviews');
        }
        const data = await response.json();
        setStaticReviews(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchStaticReviews();
  }, []);

  // Combine Static and Dynamic Reviews
  const combinedReviews = useMemo(() => [...staticReviews, ...reviews], [staticReviews, reviews]);

  // Sort Reviews by Time Descending
  const sortedReviews = useMemo(() => {
    return combinedReviews.sort((a, b) => new Date(b.time) - new Date(a.time));
  }, [combinedReviews]);

  // Filter Reviews Based on Selected Dining Hall
  const filteredReviews = useMemo(() => {
    return sortedReviews.filter((review) => {
      if (selectedHall === 'All') return true;
      const foodItem = foodItems.find((item) => item.id === review.food_item_id);
      return foodItem && foodItem.diningHallId === selectedHall;
    });
  }, [sortedReviews, selectedHall, foodItems]);

  // Handle filter tab click
  const handleFilterClick = (hallId) => {
    setSelectedHall(hallId);
    setVisibleCount(5); // Reset visible count on filter change
  };

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading || reviewsLoading) {
    return <div className="container">Loading...</div>;
  }

  if (error || reviewsError) {
    return <div className="container">Error: {error || reviewsError.message}</div>;
  }

  return (
    <div className="container">
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

      {/* Reviews Section */}
      <div className="section">
        {filteredReviews.slice(0, visibleCount).map((review) => {
          const foodItem = foodItems.find((item) => item.id === review.food_item_id);
          const diningHall = diningHalls.find((hall) => hall.id === (foodItem ? foodItem.diningHallId : null));

          if (!foodItem || !diningHall) return null; // Skip if data is missing

          return (
            <div key={`${review.id}-${review.time}`} className="review-item">
              <div className="review-header">
                <img
                  src={`/assets/Images/${foodItem.images[0]}`}
                  alt={foodItem.name}
                  className="review-food-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/Images/default.png'; // Fallback image
                  }}
                />
                <div className="review-info">
                  <Link to={`/food-item-details/${foodItem.id}`} className="food-item-link">
                    <h3 className="food-item-name">{foodItem.name}</h3>
                  </Link>
                  <p className="dining-hall-name">{diningHall.name}</p>
                </div>
              </div>
              <div className="review-stars">
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
                <span className="star-rating-text">{review.stars.toFixed(1)} Stars</span>
              </div>
              <p className="review-text">{review.text}</p>
              <div className="review-footer">
                <span className="review-time">{new Date(review.time).toLocaleString()}</span>
                <span className="review-impressions">
                  {review.impressions && review.impressions.length > 0 ? `Impressions: ${review.impressions.join(', ')}` : ''}
                </span>
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
          <div className="no-reviews">No reviews available.</div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Feed;

// Helper function to calculate average rating
const calculateAverageRating = (reviews) => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((acc, review) => acc + review.stars, 0);
  return total / reviews.length;
};