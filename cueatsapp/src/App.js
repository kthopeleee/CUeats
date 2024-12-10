// src/App.js

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import your components
import HomePage from './components/HomePage';
import Feed from './components/Feed';
import SearchPage from './components/SearchPage'; // "/review" points to SearchPage
import Review from './components/Review'; // "/review-item" points to Review
import DiningHall from './components/DiningHall';
import FoodItemDetails from './components/FoodItemDetails';

function App() {
  return (
    <div className="App">
      {/* Define your routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/review" element={<SearchPage />} />
        <Route path="/review-item" element={<Review />} />

        {/* Dynamic Route for Dining Halls */}
        <Route path="/dining-hall/:diningHallId" element={<DiningHall />} />

        {/* Dynamic Route for Food Item Details */}
        <Route path="/food-item-details/:foodItemId" element={<FoodItemDetails />} />

        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}

export default App;