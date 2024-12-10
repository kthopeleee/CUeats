// src/components/FoodItemDetails.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './FoodItemDetails.css';
import Footer from './Footer';
// import renderStars from '../utils/renderStars'; // Unused import, can be removed if not needed

// Import images
import grilledCheese from '../assets/Images/grilled_cheese.png';

function FoodItemDetails() {
  return (
    <div className="container">
      {/* Back Navigation */}
      <div className="nav-back">
        <Link to="/dining-hall" className="back-link">&lt; Ferris Booth Commons</Link>
      </div>

      {/* Food Image */}
      <div className="food-image-container">
        <img src={grilledCheese} alt="Grilled Cheese" className="food-image" />
      </div>

      {/* Food Details */}
      <div className="food-details">
        <div className="food-title-container">
          <div className="food-title">Grilled Cheese</div>
          {/* Wrap the Review button with Link */}
          <Link to="/review" className="review-link">
            <button className="review-button">Review</button>
          </Link>
        </div>
        <div className="ratings">
          <span className="stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </span>
          <span className="rating-score">4.5</span>
        </div>
        <div className="food-tags">
          <p>Contains <span className="tag">dairy</span>, <span className="tag">wheat</span></p>
          <p>Reviews mention <span className="tag">long wait</span>, <span className="tag">delicious</span>, <span className="tag">tomato soup</span></p>
        </div>
      </div>

      <hr className="divider" />

      {/* Reviews Section */}
      <div className="reviews-header">
        Reviews (122)
      </div>
      <div className="sort-options">↑↓ Recent</div>

      {/* Review 1 */}
      <div className="review">
        <div className="review-stars-container">
          <div className="review-stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
          <div className="ratings-options">
            <a href="#"><i className="fa-regular fa-heart"></i></a>
            <a href="#"><i className="fa-solid fa-share-nodes"></i></a>
          </div>
        </div>
        <div className="review-text">The grilled cheese at Ferris is pretty solid. Kind of basic but reliable. The line is so long though.</div>
        <div className="review-footer">
          <span>2 hrs ago</span>
        </div>
      </div>

      <hr className="divider" />

      {/* Review 2 */}
      <div className="review">
        <div className="review-stars-container">
          <div className="review-stars">
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
          <div className="ratings-options">
            <a href="#"><i className="fa-regular fa-heart"></i></a>
            <a href="#"><i className="fa-solid fa-share-nodes"></i></a>
          </div>
        </div>
        <div className="review-text">The most elite meal at Columbia. I would eat this every day if I could. Never once have I been disappointed by the grilled cheese.</div>
        <div className="review-footer">
          <span>6 hrs ago</span>
        </div>
      </div>

      <hr className="divider" />

      {/* Navigation Bar */}
      <Footer />
    </div>
  );
}

export default FoodItemDetails;