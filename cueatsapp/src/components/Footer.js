import React from 'react';
import './Footer.css';

// Import footer icons
import homeIcon from '../assets/NavBar_icons/home.png';
import reviewIcon from '../assets/NavBar_icons/review.png';
import feedIcon from '../assets/NavBar_icons/feed.png';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-item">
        <img className="footer-icon" src={homeIcon} alt="Home Icon" />
        <div>Home</div>
      </div>
      <div className="footer-item">
        <img className="footer-icon" src={reviewIcon} alt="Review Icon" />
        <div>Review</div>
      </div>
      <div className="footer-item">
        <img className="footer-icon" src={feedIcon} alt="Feed Icon" />
        <div>Feed</div>
      </div>
    </footer>
  );
}

export default Footer;