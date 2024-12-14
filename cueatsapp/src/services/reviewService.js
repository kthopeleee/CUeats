// src/services/reviewService.js

import axios from 'axios';

// Base URL of your Flask backend
const API_BASE_URL = 'http://127.0.0.1:5000/api';

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