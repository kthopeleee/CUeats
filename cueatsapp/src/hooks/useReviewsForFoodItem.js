// src/hooks/useReviewsForFoodItem.js

import { useEffect, useState } from 'react';

const useReviewsForFoodItem = (foodItemId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/data/reviews.json');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        const filteredReviews = data.filter((review) => review.foodItemId === foodItemId);
        setReviews(filteredReviews);
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