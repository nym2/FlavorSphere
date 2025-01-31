from flask import Flask, send_from_directory
from flask_migrate import Migrate  
from .models import db
from .routes import routes
from flask_cors import CORS
import os

def create_app():
    app = Flask(__name__, static_folder="frontend/build", static_url_path="")  
    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    CORS(app, origins=["*"])

    migrate = Migrate(app, db)

    app.register_blueprint(routes)

    
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_react_app(path):
        
        if path and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        
        return send_from_directory(app.static_folder, "index.html")

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0')
