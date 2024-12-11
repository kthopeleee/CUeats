// src/services/reviewService.js

export const addReview = async (review) => {
    // Temporary implementation: Just resolve after a delay
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success
        console.log('Review added:', review);
        resolve();
      }, 1000);
    });
  };