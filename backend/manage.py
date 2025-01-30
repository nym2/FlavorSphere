from app import create_app
from flask_migrate import MigrateCommand
from flask_script import Manager

app = create_app()

# Set up the Manager
manager = Manager(app)

# Add MigrateCommand to the Manager
manager.add_command('db', MigrateCommand)

if __name__ == "__main__":
    manager.run()
