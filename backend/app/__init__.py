from flask import Flask
from flask_migrate import Migrate  # Import Migrate
from .models import db
from .routes import routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    # Update the URI path to your actual database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Update path as needed
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Initialize the database with the app
    db.init_app(app)

    # Enable CORS for the frontend at this address
    CORS(app, origins=["*"])

    # Initialize Migrate with the app and db
    migrate = Migrate(app, db)

    # Register the routes blueprint without a URL prefix
    app.register_blueprint(routes)

    return app
