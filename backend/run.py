from flask import Flask
from flask_cors import CORS
from app.routes import routes  # Ensure the correct import

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

# Register the routes blueprint
app.register_blueprint(routes)  # This is where you register the routes blueprint

if __name__ == '__main__':
    app.run(debug=True)
