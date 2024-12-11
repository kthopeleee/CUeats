// src/App.js

import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

// Import your components
import HomePage from './components/HomePage';
import Feed from './components/Feed';
import SearchPage from './components/SearchPage';
import Review from './components/Review';
import DiningHall from './components/DiningHall';
import FoodItemDetails from './components/FoodItemDetails';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/search" element={<SearchPage />} />
          
          {/* New Route for /review without parameters */}
          <Route path="/review" element={<SearchPage />} />
          
          {/* Existing Route for /review/:foodItemId */}
          <Route path="/review/:foodItemId" element={<Review />} />

          {/* Dynamic Route for Dining Halls */}
          <Route path="/dining-hall/:diningHallId" element={<DiningHall />} />

          {/* Dynamic Route for Food Item Details */}
          <Route path="/food-item-details/:foodItemId" element={<FoodItemDetails />} />

          {/* Fallback Route for 404 */}
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;