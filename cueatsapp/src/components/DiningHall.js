import React from 'react';
import './DiningHall.css';
import Footer from './Footer';

// Import images
import fullstar from '../assets/Stars/Full_Star.png';
import black from '../assets/Dish/black.png';

function DiningHall() {
  return (
    <div className="container">
      <div className="header">
        <a href="#" className="back-button">&lt; Home</a>
        <div className="header-title">Ferris Booth Commons</div>
        <div className="header-subtitle">Open until 8:00 pm</div>
        <div className="tabs">
          <div className="tab breakfast">
            <a href="#breakfast">
              Breakfast
              <div className="tab-times">7:00am-11:30am</div>
            </a>
          </div>
          <div className="tab lunch">
            <a href="#lunch">
              Lunch
              <div className="tab-times">11:00am-2:30pm</div>
            </a>
          </div>
          <div className="tab dinner">
            <a href="#dinner">
              Dinner
              <div className="tab-times">4:30pm-8:00pm</div>
            </a>
          </div>
        </div>
      </div>

      <div className="section">
        {/* Grilled Cheese Dish */}
        <div className="dish">
          <div className="images-row">
            <img src={black} alt="Grilled Cheese" />
            <img src={black} alt="Grilled Cheese" />
            <img src={black} alt="Grilled Cheese" />
          </div>
          <div className="dish-title">Grilled Cheese</div>
          <div className="rating-row">
            <img src={fullstar} alt="star" className="star" />
            <img src={fullstar} alt="star" className="star" />
            <img src={fullstar} alt="star" className="star" />
            <img src={fullstar} alt="star" className="star" />
            <img src={fullstar} alt="star" className="star empty-star" />
            <span className="rating-text">4.1 (120 ratings)</span>
          </div>
          <div className="dish-info-green">Action Station until 4:00 pm</div>
          <div className="dish-info">Contains dairy, gluten</div>
          <div className="review">
            <span className="comment-icon">💬</span>
            “So cruncy...goey”
            <span className="read-more">Read more</span>
          </div>
        </div>

        {/* Waffles Dish */}
        <div className="dish">
          <div className="images-row">
            <img src={black} alt="Waffles" />
            <img src={black} alt="Waffles" />
            <img src={black} alt="Waffles" />
          </div>
          <div className="dish-title">Waffles</div>
          <div className="rating-row">
            <img src={fullstar} alt="star" className="star" />
            <img src={fullstar} alt="star" className="star" />
            <img src={fullstar} alt="star" className="star" />
            <img src={fullstar} alt="star" className="star empty-star" />
            <img src={fullstar} alt="star" className="star empty-star" />
            <span className="rating-text">3.0 (80 ratings)</span>
          </div>
          <div className="dish-info-green">Main Line until 4:00 pm</div>
          <div className="dish-info">Contains dairy, gluten</div>
          <div className="review">
            <span className="comment-icon">💬</span>
            “super fluffy and soft...so yum”
            <span className="read-more">Read more</span>
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
        <Footer />
    </div>
  );
}

export default DiningHall;