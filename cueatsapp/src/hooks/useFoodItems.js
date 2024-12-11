// src/hooks/useFoodItems.js

import { useEffect, useState } from 'react';

const useFoodItems = (diningHallId) => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('/data/foodItems.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const items = data.filter((item) => item.diningHallId === diningHallId);
        setFoodItems(items);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [diningHallId]);

  return { foodItems, loading, error };
};

export default useFoodItems;