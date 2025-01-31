from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    priority = db.Column(db.Integer, nullable=False, default=0)  
    recipes = db.relationship('Recipe', backref='category', lazy=True, cascade="all, delete-orphan")  

    def __repr__(self):
        return f"<Category {self.name}>"

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    reviews = db.relationship('Review', backref='recipe', lazy=True, cascade="all, delete-orphan")  

    def __repr__(self):
        return f"<Recipe {self.name}>"

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipe.id'), nullable=False)

    def __repr__(self):
        return f"<Review {self.id} for Recipe {self.recipe_id}>"
