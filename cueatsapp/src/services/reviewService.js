// src/services/reviewService.js

import axios from 'axios';

// Use environment variable for API base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5000/api';

// Function to add a new review
export const addReview = async (reviewData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    // Extract error message
    const errorMsg = error.response && error.response.data && error.response.data.error
      ? error.response.data.error
      : error.message;
    throw new Error(errorMsg);
  }
};


export const getAllReviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews`);
    return response.data.reviews;
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.message;
    throw new Error(errorMsg);
  }
};


// Function to get reviews for a specific food item
export const getReviewsForFoodItem = async (foodItemId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reviews/${foodItemId}`);
    return response.data.reviews;
  } catch (error) {
    const errorMsg = error.response && error.response.data && error.response.data.error
      ? error.response.data.error
      : error.message;
    throw new Error(errorMsg);
  }
};