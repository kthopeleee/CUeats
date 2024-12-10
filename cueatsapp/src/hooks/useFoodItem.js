// src/hooks/useFoodItem.js

import { useEffect, useState } from 'react';

const useFoodItem = (foodItemId) => {
  const [foodItem, setFoodItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFoodItem = async () => {
      try {
        const response = await fetch('/data/foodItems.json');
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        const item = data.find((f) => f.id === foodItemId);
        if (item) {
          // Fetch dining hall name for back navigation
          const diningHallResponse = await fetch('/data/diningHalls.json');
          if (!diningHallResponse.ok) {
            throw new Error('Failed to fetch dining halls');
          }
          const diningHalls = await diningHallResponse.json();
          const diningHall = diningHalls.find((h) => h.id === item.diningHallId);
          setFoodItem({
            ...item,
            diningHallName: diningHall ? diningHall.name : 'Unknown Dining Hall'
          });
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchFoodItem();
  }, [foodItemId]);

  return { foodItem, loading, error };
};

export default useFoodItem;