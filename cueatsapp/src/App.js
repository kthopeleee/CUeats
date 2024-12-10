import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Import your components
import HomePage from './components/HomePage';
import Feed from './components/Feed';
import Review from './components/Review';
import SearchPage from './components/SearchPage';
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
        <Route path="/dining-hall" element={<DiningHall />} />
        <Route path="/food-item-details" element={<FoodItemDetails />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* <SearchPage /> */}
      {/*         <Route path="/review" element={<Review />} /> */}
      {/* <Review /> */}
      {/*  <HomePage />,   */}      
      {/* <FoodItemDetails /> */}
      {/* <DiningHall /> */}
      {/* <Feed /> */}  
      {/* <Review /> */}
      {/* <FoodItemDetails /> */}
      {/* <FoodItemDetails /> */}
      {/* <DiningHall /> */}
    </div>
  );
}

export default App;