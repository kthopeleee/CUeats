// src/hooks/useDiningHall.js

import { useEffect, useState } from 'react';

const useDiningHall = (diningHallId) => {
  const [diningHall, setDiningHall] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiningHall = async () => {
      try {
        const response = await fetch('/data/diningHalls.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const hall = data.find((h) => h.id === diningHallId);
        setDiningHall(hall);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchDiningHall();
  }, [diningHallId]);

  return { diningHall, loading, error };
};

export default useDiningHall;