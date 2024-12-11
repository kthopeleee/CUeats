// src/components/SearchPage.js

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link if needed
import './SearchPage.css';
import Header from './Header';
import Footer from './Footer';
import SearchBar from './SearchBar'; // Import the SearchBar component

// Logo and Nav Icons
import Logo from '../assets/NavBar_icons/logoimg.png';
import HomeIcon from '../assets/NavBar_icons/home.png';
import ReviewIcon from '../assets/NavBar_icons/review.png';
import FeedIcon from '../assets/NavBar_icons/feed.png';

// Keyboard image
import KeyboardImage from '../assets/Keyboard/Keyboard.png';

function SearchPage() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const inputRef = useRef(null);

  const trendingDishes = [
    { name: "Mac and Cheese", hall: "Hewitt" },
    { name: "Grilled Cheese", hall: "Ferris" },
    { name: "Ramen", hall: "Grace Dodge" },
    { name: "Smoothie", hall: "Diana" },
    { name: "Tacos", hall: "John Jay" },
    { name: "Bagels", hall: "John Jay" }
  ];

  const diningHalls = [
    { id: "hewitt", name: "Hewitt" }, 
    { id: "diana", name: "Diana" }, 
    { id: "ferris", name: "Ferris" }, 
    { id: "grace-dodge", name: "Grace Dodge" },
    { id: "john-jay", name: "John Jay" }, 
    { id: "faculty-house", name: "Faculty House" }, 
    { id: "chef-mikes", name: "Chef Mikes" }, 
    { id: "chef-dons", name: "Chef Dons" }
  ];

  const foodItems = [
    { id: "mac-cheese-hewitt", name: "Mac and Cheese" },
    { id: "grilled-cheese-ferris", name: "Grilled Cheese" },
    { id: "ramen-grace-dodge", name: "Ramen" },
    { id: "smoothie-diana", name: "Smoothie" },
    { id: "tacos-john-jay", name: "Tacos" },
    { id: "bagels-john-jay", name: "Bagels" }
    // Add more food items as needed
  ];

  const handleFocus = () => {
    setIsKeyboardVisible(true);
  };

  const handleBlur = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <div className="container">
      {/* Use the Header component */}
      <Header />

      {/* Header with Logo and Search */}
      <div className="header-section">
        <div className="logo-row">
          <img src={Logo} alt="CU Eats Logo" className="logo-icon" />
          <span className="logo-text">CU Eats</span>
        </div>
        {/* Integrate SearchBar Component */}
        <SearchBar foodItems={foodItems} diningHalls={diningHalls} />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="section-title">Trending Dishes</div>
        <div className="trending-grid">
          {trendingDishes.map((dish, index) => (
            <Link to={`/food-item-details/${dish.name.toLowerCase().replace(/ /g, '-')}`} key={index} className="dish-item">
              <div className="dish-name">{dish.name}</div>
              <div className="dish-hall">{dish.hall}</div>
            </Link>
          ))}
        </div>

        <div className="section-title">Dining Halls</div>
        <div className="halls-grid">
          {diningHalls.map((hall, index) => (
            <Link to={`/dining-hall/${hall.id}`} key={index} className="hall-item">
              {hall.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Keyboard Simulation with image */}
      {isKeyboardVisible && (
        <div className="keyboard-simulation">
          <img src={KeyboardImage} alt="Keyboard" className="keyboard-image"/>
        </div>
      )}
    </div>
  );
}

export default SearchPage;