# flask-backend/app/routes.py

from flask import Blueprint, request, jsonify
from . import db
from .models import Review

api = Blueprint('api', __name__)

@api.route('/reviews', methods=['POST'])
def add_review():
    data = request.get_json()
    
    required_fields = ['food_item_id', 'stars', 'text']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f"'{field}' is required."}), 400
    
    food_item_id = data['food_item_id']
    stars = data['stars']
    text = data['text']
    impressions = data.get('impressions', [])
    impressions_str = ','.join(impressions)
    time = data.get('time')  # Assuming time is sent as ISO string
    
    if not isinstance(stars, int) or stars < 1 or stars > 5:
        return jsonify({'error': 'Stars must be an integer between 1 and 5.'}), 400
    
    # Validate time
    if time:
        try:
            from datetime import datetime
            time_parsed = datetime.fromisoformat(time)
        except ValueError:
            return jsonify({'error': 'Invalid time format.'}), 400
    else:
        from datetime import datetime
        time_parsed = datetime.utcnow()
    
    new_review = Review(
        food_item_id=food_item_id,
        stars=stars,
        text=text,
        impressions=impressions_str,
        time=time_parsed
    )
    
    try:
        db.session.add(new_review)
        db.session.commit()
        return jsonify({'message': 'Review added successfully.', 'review': new_review.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add review.'}), 500

@api.route('/reviews/<food_item_id>', methods=['GET'])
def get_reviews(food_item_id):
    reviews = Review.query.filter_by(food_item_id=food_item_id).all()
    reviews_list = [review.to_dict() for review in reviews]
    return jsonify({'reviews': reviews_list}), 200