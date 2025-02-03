import os
from flask import Flask
from flask_migrate import Migrate  
from .models import db
from .routes import routes
from flask_cors import CORS
from dotenv import load_dotenv
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL") 
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    CORS(app, origins=["*"])

    migrate = Migrate(app, db)

    
    app.register_blueprint(routes)

    return app

if __name__ == '__main__':
    app = create_app()
    
    app.run(debug=True, host='0.0.0.0')
