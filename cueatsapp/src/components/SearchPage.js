import React, { useState, useRef } from 'react';
import './SearchPage.css';
import Header from './Header';
import Footer from './Footer';

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
    "Hewitt", "Diana", "Ferris", "Grace Dodge",
    "John Jay", "Faculty House", "Chef Mikes", "Chef Dons"
  ];

  const handleFocus = () => {
    setIsKeyboardVisible(true);
  };

  const handleBlur = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <div className="search-container">
      {/* Use the Header component */}
      <Header />

      {/* Header with Logo and Search */}
      <div className="header-section">
        <div className="logo-row">
          <img src={Logo} alt="CU Eats Logo" className="logo-icon" />
          <span className="logo-text">CU Eats</span>
        </div>
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search for a specific dish or dining hall" 
            onFocus={handleFocus} 
            onBlur={handleBlur} 
            ref={inputRef}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="section-title">Trending Dishes</div>
        <div className="trending-grid">
          {trendingDishes.map((dish, index) => (
            <div key={index} className="dish-item">
              <div className="dish-name">{dish.name}</div>
              <div className="dish-hall">{dish.hall}</div>
            </div>
          ))}
        </div>

        <div className="section-title">Dining Halls</div>
        <div className="halls-grid">
          {diningHalls.map((hall, index) => (
            <div key={index} className="hall-item">
              {hall}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Nav */}
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