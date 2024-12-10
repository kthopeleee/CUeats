// src/components/Review.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './Review.css';
import Footer from './Footer';
// Import icons if needed, or rely on the global Font Awesome link

function Review() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        {/* Replace <a> with <Link> for back navigation */}
        <Link to="/food-item-details" className="back">
          <i className="fa-solid fa-angle-left"></i> Review
        </Link>
      </header>

      {/* Page Content */}
      <div className="page-container">
        <div className="add-review-container">
          <p>Ferris Booth Commons</p>
          <h1>Grilled Cheese</h1>
          <div className="ratings">
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
            <i className="fa-regular fa-star"></i>
          </div>
          <div className="date">
            <p>When did you visit?</p>
            <select name="" id="">
              <option value="Today">Today</option>
              <option value="Yesterday">Yesterday</option>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
            </select>
          </div>
          <div className="impression">
            <button>Fresh</button>
            <button>Tasty</button>
            <button>Convenient</button>
            <button>Stale</button>
            <button>Bland</button>
            <button>Undercooked</button>
          </div>
          <textarea name="" placeholder="Add more details here..."></textarea>
          <button className="add-btn"><i className="fa-solid fa-circle-plus"></i> <span>Add photo</span></button>
          <button className="review-btn">Submit Review</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />  
    </div>
  );
}

export default Review;