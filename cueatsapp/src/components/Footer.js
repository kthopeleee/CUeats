import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Footer.css';

// Import footer icons
import homeIcon from '../assets/NavBar_icons/home.png';
import reviewIcon from '../assets/NavBar_icons/review.png';
import feedIcon from '../assets/NavBar_icons/feed.png';

function Footer() {
  const location = useLocation();

  return (
    <footer className="footer-container">
      <div className="footer-item">
        <Link to="/" className={`footer-link ${location.pathname === '/' ? 'active' : ''}`}>
          <img className="footer-icon" src={homeIcon} alt="Home Icon" />
          <div>Home</div>
        </Link>
      </div>
      <div className="footer-item">
        <Link to="/review" className={`footer-link ${location.pathname === '/review' ? 'active' : ''}`}>
          <img className="footer-icon" src={reviewIcon} alt="Review Icon" />
          <div>Review</div>
        </Link>
      </div>
      <div className="footer-item">
        <Link to="/feed" className={`footer-link ${location.pathname === '/feed' ? 'active' : ''}`}>
          <img className="footer-icon" src={feedIcon} alt="Feed Icon" />
          <div>Feed</div>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;