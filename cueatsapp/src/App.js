// src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // Correctly import HomePage
import Feed from './components/Feed';
import DiningHall from './components/DiningHall';
import FoodItemDetails from './components/FoodItemDetails';
import Review from './components/Review';
import ErrorBoundary from './components/ErrorBoundary';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome if using npm
import SearchPage from './components/SearchPage';


function App() {
  return (
    <ErrorBoundary>
    <Routes>
    <Route path="/" element={<HomePage />} /> {/* Correctly point HomePage here */}
    <Route path="/feed" element={<Feed />} /> 
    <Route path="/search" element={<SearchPage />} />

      

      <Route path="/dining-hall/:diningHallId" element={<DiningHall />} />
      <Route path="/food-item-details/:foodItemId" element={<FoodItemDetails />} />
      <Route path="/review/:foodItemId" element={<Review />} />
    </Routes>
    </ErrorBoundary>
  );
}

export default App;