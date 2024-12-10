import FullStar from '../assets/Stars/Full_Star.png';
import HalfStar from '../assets/Stars/Half_Star.png';
import EmptyStar from '../assets/Stars/Empty_Star.png';

export default function renderStars(rating) {
  const stars = [];
  const fullStars = Math.floor(rating); // Number of full stars
  const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Check if there's a half star
  const emptyStars = 5 - fullStars - halfStars; // Remaining stars are empty

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<img key={`full-${i}`} src={FullStar} alt="Full Star" className="star" />);
  }

  // Add half star
  if (halfStars) {
    stars.push(<img key="half" src={HalfStar} alt="Half Star" className="star" />);
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<img key={`empty-${i}`} src={EmptyStar} alt="Empty Star" className="star" />);
  }

  return stars;
}