# backend/app/models.py

from . import db
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    food_item_id = db.Column(db.String(50), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    text = db.Column(db.Text, nullable=False)
    impressions = db.Column(db.String(200), nullable=True)  # Comma-separated
    time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'food_item_id': self.food_item_id,
            'stars': self.stars,
            'text': self.text,
            'impressions': self.impressions.split(',') if self.impressions else [],
            'time': self.time.isoformat()
        }

    def __repr__(self):
        return f"<Review {self.id}"
