// src/hooks/useReviews.js

import { useEffect, useState } from 'react';
import { getReviewsForFoodItem } from '../services/reviewService';

const useReviews = (foodItemIds) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!foodItemIds || foodItemIds.length === 0) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const fetchAllReviews = async () => {
      try {
        const allReviews = [];
        for (const id of foodItemIds) {
          const fetchedReviews = await getReviewsForFoodItem(id);
          allReviews.push(...fetchedReviews);
        }
        setReviews(allReviews);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch reviews.');
        setLoading(false);
      }
    };

    fetchAllReviews();
  }, [foodItemIds]);

  return { reviews, loading, error };
};

export default useReviews;