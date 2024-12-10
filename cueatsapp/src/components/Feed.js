import React from 'react';
import './Feed.css';
import Footer from './Footer';
// Import images
import meatballSub from '../assets/Images/meatball_sub.png';
import grilledCheese from '../assets/Images/grilled_cheese.png';


function Feed() {
  return (
    <div className="container">
      {/* Status Bar */}
      <div className="status-bar">
        <span className="time">10:01</span>
        <span className="icons">
          <i className="fa-solid fa-battery-full"></i>
        </span>
      </div>

      {/* Header */}
      <div className="header">
        <h1 className="page-title">Feed</h1>
        <div className="filters">
          <a href="#" className="active">All</a>
          <a href="#">Chef Mike's</a>
          <a href="#">Hewitt</a>
          <a href="#">Ferris</a>
          <a href="#">Grace Dodge</a>
          <a href="#">John Jay</a>
        </div>
      </div>

      {/* Section with reviews */}
      <div className="section">
        <div className="review-item">
          <h3>Meatball Sub Special</h3>
          <div className="ratings-options">
            <span className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="actions">
              <a href="#"><i className="fa-regular fa-heart"></i></a>
              <a href="#"><i className="fa-solid fa-share-nodes"></i></a>
            </span>
          </div>
          <div className="content">
            <img src={meatballSub} alt="Meatball Sub Photo" />
            <p>Might've looked good at first but turned out to be wet and soggy.</p>
          </div>
          <div className="location-time">
            <span>Chef Mike's</span>
            <span>58 mins ago</span>
          </div>
        </div>

        <div className="review-item">
          <h3>Fusion Special</h3>
          <div className="ratings-options">
            <span className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="actions">
              {/* If you have image or data for "Fusion Special", add it similarly */}
              <i className="fa-solid fa-heart"></i>
              <a href="#"><i className="fa-solid fa-share-nodes"></i></a>
            </span>
          </div>
          <div className="content">
            <p>YUMMY NEW MEAL AT FERRIS. It didn't look too good at first but this was sooo juicy and flavorful.</p>
          </div>
          <div className="location-time">
            <span>John Jay</span>
            <span>1 hr ago</span>
          </div>
        </div>

        <div className="review-item">
          <h3>Grilled Cheese</h3>
          <div className="ratings-options">
            <span className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="actions">
              <a href="#"><i className="fa-regular fa-heart"></i></a>
              <a href="#"><i className="fa-solid fa-share-nodes"></i></a>
            </span>
          </div>
          <div className="content">
            <img src={grilledCheese} alt="Grilled Cheese Photo" />
            <p>the most elite meal at columbia. i would eat this every day if i could. never once have i been
              disappointed by the grilled cheese... <a href="#">Read more</a></p>
          </div>
          <div className="location-time">
            <span>Ferris Booth Commons</span>
            <span>2 hrs ago</span>
          </div>
        </div>

        <div className="review-item">
          <h3>Lemon Pepper Chicken</h3>
          <div className="ratings-options">
            <span className="stars">
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-solid fa-star"></i>
              <i className="fa-regular fa-star"></i>
            </span>
            <span className="actions">
              <a href="#"><i className="fa-regular fa-heart"></i></a>
              <a href="#"><i className="fa-solid fa-share-nodes"></i></a>
            </span>
          </div>
          <div className="content">
            <p>Is there a professional chef that works in the back? because this fish has been spiced and grilled to PERFECTION.</p>
          </div>
          <div className="location-time">
            <span>Grace Dodge</span>
            <span>7 hrs ago</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
        <Footer />  
    </div>
  );
}

export default Feed;