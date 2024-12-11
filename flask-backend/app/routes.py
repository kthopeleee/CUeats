# app/routes.py

from flask import Blueprint, request, jsonify
from app.models import db, Review
from datetime import datetime

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    
    required_fields = ['food_item_id', 'stars', 'text']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields.'}), 400
    
    try:
        stars = int(data['stars'])
        if stars < 1 or stars > 5:
            return jsonify({'error': 'Stars must be between 1 and 5.'}), 400
    except ValueError:
        return jsonify({'error': 'Stars must be an integer.'}), 400
    
    impressions = ','.join(data.get('impressions', []))
    
    review = Review(
        food_item_id=data['food_item_id'],
        stars=stars,
        text=data['text'],
        impressions=impressions,
        time=datetime.fromisoformat(data['time']) if 'time' in data else datetime.utcnow()
    )
    
    db.session.add(review)
    db.session.commit()
    
    return jsonify({'message': 'Review added successfully.', 'review': review.to_dict()}), 201

@bp.route('/reviews/<food_item_id>', methods=['GET'])
def get_reviews(food_item_id):
    reviews = Review.query.filter_by(food_item_id=food_item_id).order_by(Review.time.desc()).all()
    reviews_list = [review.to_dict() for review in reviews]
    return jsonify({'reviews': reviews_list}), 200