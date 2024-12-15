// src/hooks/useReviews.js
import { useEffect, useState } from 'react';
import { getAllReviews } from '../services/reviewService';

const useReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const allReviews = await getAllReviews();
        setReviews(allReviews);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch reviews.');
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
};

export default useReviews;