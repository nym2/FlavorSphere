from flask import Flask
from flask_migrate import Migrate
from app import create_app, db  # Update this import based on your app structure

app = create_app()

migrate = Migrate(app, db)  # Attach Migrate to app and db

if __name__ == "__main__":
    app.run()
