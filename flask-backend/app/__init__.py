# backend/app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS

db = SQLAlchemy()


def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='/')
    app.config.from_object('app.config.Config')
    
    # Initialize extensions
    db.init_app(app)
    # migrate.init_app(app, db)
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})  # Adjust origins for production
    
    # Import models to ensure they are registered with SQLAlchemy
    # from .models import Review
    
    # Register blueprints
    from app.routes import api
    app.register_blueprint(api, url_prefix='/api')
    
    return app