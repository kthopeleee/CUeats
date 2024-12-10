// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import './HomePage.css';
import Footer from './Footer';

// Import images
import logoimg from '../assets/NavBar_icons/logoimg.png';
import magnifyingglass from '../assets/NavBar_icons/magnifyingglass.png';

// Import food images
import HoneyChicken from '../assets/Images/HoneyChicken.jpg';
import Burger from '../assets/Images/Burger.jpg';
import Salmon from '../assets/Images/Salmon.png';
import Tacos from '../assets/Images/Tacos.jpg';

// Import dining hall data
import diningHalls from '../data/diningHalls.json';

function HomePage() {
  return (
    <div className="container">
      {/* Header */}
      <header>
        <div className="logo-container">
          <img src={logoimg} alt="CU Eats Logo" className="logo-icon" />
          <span className="logo-text">CU Eats</span>
        </div>

        <div className="search-bar">
          <div className="search-icon">
            <img src={magnifyingglass} alt="Search Icon" />
          </div>
          <input type="text" placeholder="Search for a specific dish or dining hall" />
        </div>

        <div className="trending">Trending</div>
        <div className="horizontal-scroll">
          <div className="image-box">
            <img src={HoneyChicken} alt="Honey Chicken" />
            <div className="item-title">Honey Chicken</div>
          </div>
          <div className="image-box">
            <img src={Burger} alt="Burger" />
            <div className="item-title">Burger</div>
          </div>
          <div className="image-box">
            <img src={Salmon} alt="Salmon" />
            <div className="item-title">Salmon</div>
          </div>
          <div className="image-box">
            <img src={Tacos} alt="Tacos" />
            <div className="item-title">Tacos</div>
          </div>
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