from flask import Flask
from flask_cors import CORS  # Import CORS
from app.routes import routes  # Import your routes

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

# Register the routes blueprint without url_prefix
app.register_blueprint(routes)
