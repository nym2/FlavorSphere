from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    from .routes import main_bp
    app.register_blueprint(main_bp)  # Register blueprint

    return app
