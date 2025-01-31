from flask import Flask
from flask_migrate import Migrate  
from .models import db
from .routes import routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    CORS(app, origins=["*"])

    migrate = Migrate(app, db)

    app.register_blueprint(routes)

    return app
