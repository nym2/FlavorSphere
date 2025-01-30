# ./app/routes.py
from flask import Blueprint, request, jsonify
from .models import db, Category, Recipe, Review
from flask_cors import CORS  # Add CORS import

routes = Blueprint('routes', __name__)

# Enable CORS for this blueprint
CORS(routes)

@routes.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the API'})

# Route to get all categories
@routes.route('/categories', methods=['GET'])  # Notice: no "/api" here
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': category.id, 'name': category.name, 'priority': category.priority} for category in categories])

# Route to create a new recipe
@routes.route('/recipes', methods=['POST'])  # Changed to "/recipes" without "/api"
def create_recipe():
    data = request.get_json()
    new_recipe = Recipe(
        name=data['name'],
        description=data['description'],
        category_id=data['category_id']
    )
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe created successfully'}), 201

# Route to get a recipe by ID (with its reviews)
@routes.route('/recipes/<int:id>', methods=['GET'])  # Changed to "/recipes" without "/api"
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify({
        'id': recipe.id,
        'name': recipe.name,
        'description': recipe.description,
        'category': recipe.category.name,
        'reviews': [{'id': review.id, 'content': review.content} for review in recipe.reviews]
    })

@routes.route('/recipes', methods=['GET'])  # Changed to "/recipes" without "/api"
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([ 
        {
        'id': recipe.id,
        'name': recipe.name,
        'description': recipe.description,
        'category': recipe.category.name,
        'reviews': [{'id': review.id, 'content': review.content} for review in recipe.reviews]}
    for recipe in recipes])

# Route to delete a recipe
@routes.route('/recipes/<int:id>', methods=['DELETE'])  # Changed to "/recipes" without "/api"
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'})

# Route to add a review for a recipe
@routes.route('/recipes/<int:id>/reviews', methods=['POST'])  # Changed to "/recipes" without "/api"
def add_review(id):
    data = request.get_json()
    new_review = Review(
        content=data['content'],
        recipe_id=id
    )
    db.session.add(new_review)
    db.session.commit()
    return jsonify({'message': 'Review added successfully'}), 201

# Route to delete a review
@routes.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'})
