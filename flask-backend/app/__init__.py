# backend/app/__init__.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__, static_folder='static', static_url_path='/')
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})  # Adjust origins for production
    
    # Import models to ensure they are registered with SQLAlchemy
    from .models import Review
    
    # Register blueprints
    from .routes import bp as api_bp
    app.register_blueprint(api_bp)
    
    return app