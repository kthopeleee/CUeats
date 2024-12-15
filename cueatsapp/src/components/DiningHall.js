import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import './DiningHall.css';
import Footer from './Footer';
import useDiningHall from '../hooks/useDiningHall';
import useFoodItems from '../hooks/useFoodItems';

function DiningHall() {
  const { diningHallId } = useParams(); // Get diningHallId from URL
  const [diningHall, setDiningHall] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [staticReviews, setStaticReviews] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('All');
  const [currentStatus, setCurrentStatus] = useState({ message: '', isOpen: false });
  const [loading, setLoading] = useState(true);

  // Fetch dining hall, food items, and reviews
  useEffect(() => {
    const fetchDiningHall = async () => {
      try {
        const response = await fetch('/data/diningHalls.json');
        const data = await response.json();
        const hall = data.find((hall) => hall.id === diningHallId);
        setDiningHall(hall);
      } catch (error) {
        console.error('Error fetching dining hall:', error);
      }
    };

    const fetchFoodItems = async () => {
      try {
        const response = await fetch('/data/foodItems.json');
        const data = await response.json();
        const filteredItems = data.filter((item) => item.diningHallId === diningHallId);
        setFoodItems(filteredItems);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/reviews');
        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    const fetchStaticReviews = async () => {
      try {
        const response = await fetch('/data/reviews.json');
        if (!response.ok) {
          throw new Error('Failed to fetch static reviews');
        }
        const data = await response.json();
        setStaticReviews(data);
      } catch (error) {
        console.error('Error fetching static reviews:', error);
      }
    };

    Promise.all([fetchDiningHall(), fetchFoodItems(), fetchReviews(), fetchStaticReviews()]).then(() =>
      setLoading(false)
    );
  }, [diningHallId]);

  // Combine static and dynamic reviews
  const combinedReviews = useMemo(() => [...staticReviews, ...reviews], [staticReviews, reviews]);

  // Map reviews to food items
  const enrichedFoodItems = useMemo(() => {
    return foodItems.map((item) => {
      const itemReviews = combinedReviews.filter((review) => review.foodItemId === item.id);
      const averageRating =
        itemReviews.length > 0
          ? itemReviews.reduce((sum, review) => sum + review.stars, 0) / itemReviews.length
          : null;

      return { ...item, reviews: itemReviews, averageRating };
    });
  }, [foodItems, combinedReviews]);

  // Determine dining hall status
  useEffect(() => {
    if (diningHall) {
      determineDiningHallStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diningHall]);

  const determineDiningHallStatus = () => {
    const now = new Date();
    const mealTimes = diningHall.timesOpen;

    const mealOrder = ['Breakfast', 'Lunch', 'Dinner'];
    for (let meal of mealOrder) {
      const [openTimeStr, closeTimeStr] = mealTimes[meal.toLowerCase()];
      if (!openTimeStr || !closeTimeStr) continue;

      const openTime = parseTimeString(openTimeStr, now);
      const closeTime = parseTimeString(closeTimeStr, now);

      if (now >= openTime && now <= closeTime) {
        setCurrentStatus({
          message: `Closes at ${formatTime(closeTime)}`,
          isOpen: true
        });
        return;
      } else if (now < openTime) {
        setCurrentStatus({
          message: `Opens at ${formatTime(openTime)}`,
          isOpen: false
        });
        return;
      }
    }

    setCurrentStatus({ message: 'Closed for the day', isOpen: false });
  };

  const parseTimeString = (timeStr, referenceDate) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    const date = new Date(referenceDate);
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const getFilteredFoodItems = () => {
    if (selectedMeal === 'All') {
      return enrichedFoodItems;
    }
    return enrichedFoodItems.filter((item) => item.meals.includes(selectedMeal.toLowerCase()));
  };

  const filteredFoodItems = useMemo(getFilteredFoodItems, [selectedMeal, enrichedFoodItems]);

  if (loading) {
    return <div className="container">Loading...</div>;
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

  return (
    <div className="container">
      <div className="header">
        <Link to="/" className="back-button">&lt; Home</Link>
        <div className="header-title">{diningHall.name}</div>
        <div className={`header-subtitle ${!currentStatus.isOpen ? 'status-closed' : 'status-open'}`}>
          {currentStatus.message}
        </div>
        <div className="tabs">
          {['All', 'Breakfast', 'Lunch', 'Dinner'].map((meal) => (
            <button
              key={meal}
              className={`tab-button ${selectedMeal === meal ? 'active' : ''}`}
              onClick={() => setSelectedMeal(meal)}
            >
              {meal}
            </button>
          ))}
        </div>
      </div>
      <div className="section">
        {filteredFoodItems.map((item) => (
          <Link to={`/food-item-details/${item.id}`} key={item.id} className="dish-link">
            <div className="dish">
              <div className="images-row">
                <img
                  src={`/assets/Images/${item.images[0]}`}
                  alt={item.name}
                  className="dish-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/Images/default.png';
                  }}
                />
              </div>
              <div className="dish-title">{item.name}</div>
              <div className="rating-row">
                {Array.from({ length: 5 }, (_, idx) => (
                  <i
                    key={idx}
                    className={
                      idx < Math.round(item.averageRating) ? 'fa-solid fa-star' : 'fa-regular fa-star'
                    }
                  ></i>
                ))}
                <span className="rating-text">
                  {item.averageRating ? item.averageRating.toFixed(1) : 'No ratings yet'}
                </span>
              </div>
              <div className="dish-info-green">{item.station}</div>
              <div className="dish-info">Contains {item.allergies.join(', ')}</div>
            </div>
          </Link>
        ))}
        {filteredFoodItems.length === 0 && <div className="no-dishes-message">No dishes available.</div>}
      </div>
      <Footer />
    </div>
  );
}

export default DiningHall;