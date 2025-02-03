from flask_migrate import Migrate
from app import create_app, db
from flask_cors import CORS
from dotenv import load_dotenv

# Create the Flask app
app = create_app()

# Enable CORS
CORS(app)

# Initialize Flask-Migrate
migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(debug=True)
