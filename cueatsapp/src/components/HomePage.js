import React from 'react';
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

// Import dining hall images
import Ferris from '../assets/Dining_Hall_Images/Ferris.png';
import JohnJay from '../assets/Dining_Hall_Images/JohnJay.png';
import FacultyHouse from '../assets/Dining_Hall_Images/FacultyHouse.png';
import ChefMikes from '../assets/Dining_Hall_Images/ChefMikes.png';
import Hewitt from '../assets/Dining_Hall_Images/Hewitt.png';
import GraceDodge from '../assets/Dining_Hall_Images/GraceDodge.png';

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
        <div className="dining-item">
          <img src={Ferris} alt="Ferris Booth" />
          <div className="dining-info">
            <div className="title">Ferris Booth</div>
            <div className="status">Open till 7:00 pm</div>
          </div>
        </div>
        <div className="dining-item">
          <img src={JohnJay} alt="John Jay" />
          <div className="dining-info">
            <div className="title">John Jay</div>
            <div className="status">Open till 7:00 pm</div>
          </div>
        </div>
        <div className="dining-item">
          <img src={FacultyHouse} alt="Faculty House" />
          <div className="dining-info">
            <div className="title">Faculty House</div>
            <div className="status">Open till 3:00 pm</div>
          </div>
        </div>
        <div className="dining-item">
          <img src={ChefMikes} alt="Chef Mikes" />
          <div className="dining-info">
            <div className="title">Chef Mikes</div>
            <div className="status closing">Closing soon at 6:00 pm</div>
          </div>
        </div>
        <div className="dining-item">
          <img src={Hewitt} alt="Hewitt" />
          <div className="dining-info">
            <div className="title">Hewitt</div>
            <div className="status closed">Closed till 9:00 am</div>
          </div>
        </div>
        <div className="dining-item">
          <img src={GraceDodge} alt="Grace Dodge" />
          <div className="dining-info">
            <div className="title">Grace Dodge</div>
            <div className="status closed">Closed till 10:00 am</div>
          </div>
        </div>
      </div>

      {/* Footer */}
        <Footer />
    </div>
  );
}

export default HomePage;