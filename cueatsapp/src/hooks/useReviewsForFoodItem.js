// src/hooks/useReviewsForFoodItem.js

import { useEffect, useState } from 'react';
import { getReviewsForFoodItem } from '../services/reviewService';

const useReviewsForFoodItem = (foodItemId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviewsForFoodItem(foodItemId);
        setReviews(fetchedReviews);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [foodItemId]);

  return { reviews, loading, error };
};

export default useReviewsForFoodItem;