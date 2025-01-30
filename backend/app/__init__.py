from flask import Flask
from flask_migrate import Migrate  # Import Migrate
from .models import db
from .routes import routes

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Update path as needed
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    # Initialize Migrate with the app and db
    migrate = Migrate(app, db)

    # Register blueprint
    app.register_blueprint(routes)

    return app
