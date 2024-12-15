import React, { useEffect, useState } from 'react';

function Feed() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setReviews(data.reviews);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feed-container">
      {reviews.map((review) => (
        <div key={review.id} className="review-card">
          <h3>{review.food_item_id}</h3>
          <p>{review.text}</p>
          <p>⭐ {review.stars}</p>
        </div>
      ))}
    </div>
  );
}

export default Feed;