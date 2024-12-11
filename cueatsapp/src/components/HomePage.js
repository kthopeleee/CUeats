import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './HomePage.css';
import Footer from './Footer';
import SearchBar from './SearchBar'; // Import the SearchBar component

// Import images
import logoimg from '../assets/NavBar_icons/logo.svg';
import magnifyingglass from '../assets/NavBar_icons/magnifyingglass.svg';

function HomePage() {
  const [diningHalls, setDiningHalls] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [trendingDishes, setTrendingDishes] = useState([]);
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

  // Determine trending dishes after data is fetched
  useEffect(() => {
    if (diningHalls.length === 0 || foodItems.length === 0 || reviews.length === 0) return;

    const currentTime = new Date();

    // Function to check if current time is within a given time range
    const isCurrentTimeWithin = (start, end) => {
      const [startHour24, startMinute24] = convertTo24Hour(start).split(':').map(Number);
      const [endHour24, endMinute24] = convertTo24Hour(end).split(':').map(Number);

      const startDate = new Date();
      startDate.setHours(startHour24, startMinute24, 0, 0);

      const endDate = new Date();
      endDate.setHours(endHour24, endMinute24, 0, 0);

      return currentTime >= startDate && currentTime <= endDate;
    };

    // Map foodItemId to number of reviews
    const reviewCountMap = {};
    reviews.forEach((review) => {
      if (reviewCountMap[review.foodItemId]) {
        reviewCountMap[review.foodItemId] += 1;
      } else {
        reviewCountMap[review.foodItemId] = 1;
      }
    });

    // Filter eligible dishes
    const eligibleDishes = foodItems.filter((dish) => {
      if (dish.rating < 4.0) return false;

      const diningHall = diningHalls.find((hall) => hall.id === dish.diningHallId);
      if (!diningHall) return false;

      // Check if current time falls within any of the meals the dish is served
      return dish.meals.some((meal) => {
        const [start, end] = diningHall.timesOpen[meal];
        return isCurrentTimeWithin(start, end);
      });
    });

    // Sort eligible dishes by number of reviews descending
    eligibleDishes.sort((a, b) => {
      const reviewsA = reviewCountMap[a.id] || 0;
      const reviewsB = reviewCountMap[b.id] || 0;
      return reviewsB - reviewsA;
    });

    // Select top 4 dishes
    const topDishes = eligibleDishes.slice(0, 4);

    setTrendingDishes(topDishes);
  }, [diningHalls, foodItems, reviews]);

  // Helper function to convert 12-hour format to 24-hour format
  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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
      <header>
        <div className="logo-container">
          <img src={logoimg} alt="CU Eats Logo" className="logo-icon" />
          <span className="logo-text">CU Eats</span>
        </div>

        {/* Integrate SearchBar Component */}
        <SearchBar foodItems={foodItems} diningHalls={diningHalls} />

        <div className="trending">Trending</div>
        <div className="horizontal-scroll">
          {trendingDishes.length > 0 ? (
            trendingDishes.map((dish) => (
              <Link to={`/food-item-details/${dish.id}`} key={dish.id} className="image-box">
                <img
                  src={`/assets/Images/${dish.images[0]}`}
                  alt={dish.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/Images/default.png'; // Fallback image
                  }}
                />
                <div className="item-title">{dish.name}</div>
              </Link>
            ))
          ) : (
            <div className="no-trending">No trending dishes at the moment.</div>
          )}
        </div>
      </header>

      <div className="divider"></div>

      {/* Dining Hall Section */}
      <div className="dining-section">
        {diningHalls.map((hall) => (
          <Link to={`/dining-hall/${hall.id}`} key={hall.id} className="dining-link">
            <div className="dining-item">
              <img
                src={`/assets/Dining_Hall_Images/${hall.image}`}
                alt={hall.name}
                className="dining-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/Dining_Hall_Images/default.png'; // Fallback image
                }}
              />
              <div className="dining-info">
                <div className="title">{hall.name}</div>
                <div className={`status ${hall.isOpen ? 'open' : 'closed'}`}>
                  {hall.isOpen ? `Open till ${hall.timesOpen.dinner[1]}` : 'Closed'}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;