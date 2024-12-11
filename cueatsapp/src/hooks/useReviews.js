// src/hooks/useReviews.js

import { useEffect, useState } from 'react';

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

    const fetchReviews = async () => {
      try {
        const response = await fetch('/data/reviews.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredReviews = data.filter((review) =>
          foodItemIds.includes(review.foodItemId)
        );
        setReviews(filteredReviews);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchReviews();
  }, [foodItemIds]);

  return { reviews, loading, error };
};

export default useReviews;