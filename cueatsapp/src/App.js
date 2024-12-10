import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import FoodItemDetails from './components/FoodItemDetails';
import DiningHall from './components/DiningHall';

function App() {
  return (
    <div>
      {/* Display one of the pages at a time */}
      <FoodItemDetails />
      {/*  <HomePage />,       <FoodItemDetails />
 <FoodItemDetails /> */}
     
      {/* <DiningHall /> ';
 */}
    </div>
  );
}

export default App;