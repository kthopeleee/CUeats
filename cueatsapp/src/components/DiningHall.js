import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import './DiningHall.css';
import Footer from './Footer';

function DiningHall() {
  const { diningHallId } = useParams(); // Get diningHallId from URL
  const [diningHall, setDiningHall] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('All');
  const [loading, setLoading] = useState(true);

  // Fetch dining hall data
  useEffect(() => {
    const fetchDiningHall = async () => {
      try {
        const response = await fetch(`/data/diningHalls.json`);
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

    Promise.all([fetchDiningHall(), fetchFoodItems(), fetchReviews()]).then(() => setLoading(false));
  }, [diningHallId]);

  // Calculate average ratings and associate reviews with food items
  const enrichedFoodItems = useMemo(() => {
    return foodItems.map((item) => {
      const itemReviews = reviews.filter((review) => review.foodItemId === item.id);
      const averageRating =
        itemReviews.length > 0
          ? itemReviews.reduce((sum, review) => sum + review.stars, 0) / itemReviews.length
          : null;

      return { ...item, reviews: itemReviews, averageRating };
    });
  }, [foodItems, reviews]);

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
        {enrichedFoodItems.map((item) => (
          <div key={item.id} className="dish">
            <div className="images-row">
              <img
                src={`/assets/Images/${item.images[0]}`}
                alt={item.name}
                className="dish-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/assets/Images/default.png'; // Fallback image
                }}
              />
            </div>
            <div className="dish-title">{item.name}</div>
            <div className="rating-row">
              {item.averageRating ? (
                <>
                  {Array.from({ length: 5 }, (_, idx) => (
                    <i
                      key={idx}
                      className={
                        idx < Math.round(item.averageRating)
                          ? 'fa-solid fa-star'
                          : 'fa-regular fa-star'
                      }
                    ></i>
                  ))}
                  <span className="rating-text">{item.averageRating.toFixed(1)}</span>
                </>
              ) : (
                <span>No ratings yet</span>
              )}
            </div>
            <div className="dish-info-green">{item.station}</div>
            <div className="dish-info">Contains {item.allergies.join(', ')}</div>
            <div className="reviews">
              {item.reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="review">
                  <span>{review.text}</span>
                </div>
              ))}
              {item.reviews.length > 3 && <Link to={`/food-item-details/${item.id}`}>Read more reviews</Link>}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default DiningHall;