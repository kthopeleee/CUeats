import React, { useEffect, useState, useMemo } from 'react';
import './Feed.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function Feed() {
  const [diningHalls, setDiningHalls] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedHall, setSelectedHall] = useState('All');
  const [visibleCount, setVisibleCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Dining Halls
  useEffect(() => {
    const fetchDiningHalls = async () => {
      try {
        const response = await fetch('/data/diningHalls.json');
        const data = await response.json();
        setDiningHalls(data);
      } catch (err) {
        console.error('Error fetching dining halls:', err);
        setError('Failed to fetch dining halls.');
      }
    };

    fetchDiningHalls();
  }, []);

  // Fetch Food Items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('/data/foodItems.json');
        const data = await response.json();
        setFoodItems(data);
      } catch (err) {
        console.error('Error fetching food items:', err);
        setError('Failed to fetch food items.');
      }
    };

    fetchFoodItems();
  }, []);

  // Fetch Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/reviews');
        const data = await response.json();
        setReviews(data.reviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Filter Reviews Based on Selected Dining Hall
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      if (selectedHall === 'All') return true;
      const foodItem = foodItems.find((item) => item.id === review.foodItemId);
      return foodItem && foodItem.diningHallId === selectedHall;
    });
  }, [reviews, foodItems, selectedHall]);

  // Handle filter tab click
  const handleFilterClick = (hallId) => {
    setSelectedHall(hallId);
    setVisibleCount(5); // Reset visible count on filter change
  };

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (error) {
    return <div className="container">Error: {error}</div>;
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
          const foodItem = foodItems.find((item) => item.id === review.foodItemId);
          const diningHall = diningHalls.find((hall) => hall.id === (foodItem ? foodItem.diningHallId : null));

          if (!foodItem || !diningHall) return null; // Skip if data is missing

          return (
            <div key={review.id} className="review-item">
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