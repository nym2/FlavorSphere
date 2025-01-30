from flask import Blueprint, request, jsonify
from .models import db, Category, Recipe, Review
from flask_cors import CORS

routes = Blueprint('routes', __name__)

# Enable CORS for this blueprint
CORS(routes)

# Home route
@routes.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Welcome to the API'})

# =========================================
# Category Routes
# =========================================

# Route to get all categories
@routes.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': category.id, 'name': category.name, 'priority': category.priority} for category in categories])

# Route to create a new category
@routes.route('/categories', methods=['POST'])
def create_category():
    data = request.get_json()

    if not data or not data.get('name'):
        return jsonify({'message': 'Missing required field: name'}), 400

    new_category = Category(
        name=data['name'],
        priority=data.get('priority', 0)  # Default priority is 0 if not provided
    )
    db.session.add(new_category)
    db.session.commit()
    
    return jsonify({'message': 'Category created successfully', 'id': new_category.id}), 201

# Route to get a single category by ID
@routes.route('/categories/<int:id>', methods=['GET'])
def get_category(id):
    category = Category.query.get_or_404(id)
    return jsonify({'id': category.id, 'name': category.name, 'priority': category.priority})

# Route to update a category
@routes.route('/categories/<int:id>', methods=['PUT'])
def update_category(id):
    category = Category.query.get_or_404(id)
    data = request.get_json()

    if 'name' in data:
        category.name = data['name']
    if 'priority' in data:
        category.priority = data['priority']

    db.session.commit()
    return jsonify({'message': 'Category updated successfully'}), 200

# Route to delete a category (and its associated recipes)
@routes.route('/categories/<int:id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.get_or_404(id)
    
    # Cascading delete: recipes will be deleted when the category is deleted
    db.session.delete(category)
    db.session.commit()
    return jsonify({'message': 'Category deleted successfully and associated recipes removed'}), 200

# =========================================
# Recipe Routes
# =========================================

# Route to get all recipes
@routes.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([{
        'id': recipe.id,
        'name': recipe.name,
        'description': recipe.description,
        'category': recipe.category.name,
        'reviews': [{'id': review.id, 'content': review.content} for review in recipe.reviews]
    } for recipe in recipes])

# Route to create a new recipe
@routes.route('/recipes', methods=['POST'])
def create_recipe():
    data = request.get_json()

    if not data or not data.get('name') or not data.get('category_id'):
        return jsonify({'message': 'Missing required fields: name, description, or category_id'}), 400

    category = Category.query.get(data['category_id'])
    if not category:
        return jsonify({'message': 'Category not found'}), 404

    new_recipe = Recipe(
        name=data['name'],
        description=data.get('description', ''),  # Default to empty string if not provided
        category_id=data['category_id']
    )
    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe created successfully', 'id': new_recipe.id}), 201

# Route to get a recipe by ID (with its reviews)
@routes.route('/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify({
        'id': recipe.id,
        'name': recipe.name,
        'description': recipe.description,
        'category': recipe.category.name,
        'reviews': [{'id': review.id, 'content': review.content} for review in recipe.reviews]
    })

# Route to update a recipe
@routes.route('/recipes/<int:id>', methods=['PUT'])
def update_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    data = request.get_json()

    if 'name' in data:
        recipe.name = data['name']
    if 'description' in data:
        recipe.description = data['description']
    if 'category_id' in data:
        category = Category.query.get(data['category_id'])
        if category:
            recipe.category_id = data['category_id']

    db.session.commit()
    return jsonify({'message': 'Recipe updated successfully'}), 200

# Route to delete a recipe (and its associated reviews)
@routes.route('/recipes/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    
    # Cascading delete: reviews will be deleted when the recipe is deleted
    db.session.delete(recipe)
    db.session.commit()

    return jsonify({'message': 'Recipe deleted successfully and associated reviews removed'}), 200

# =========================================
# Review Routes
# =========================================

# Route to add a review for a recipe
@routes.route('/recipes/<int:id>/reviews', methods=['POST'])
def add_review(id):
    data = request.get_json()

    if not data or not data.get('content'):
        return jsonify({'message': 'Missing required field: content'}), 400

    # Check if the recipe exists
    recipe = Recipe.query.get(id)
    if not recipe:
        return jsonify({'message': 'Recipe not found'}), 404

    new_review = Review(
        content=data['content'],
        recipe_id=id
    )
    db.session.add(new_review)
    db.session.commit()
    
    return jsonify({'message': 'Review added successfully', 'id': new_review.id}), 201

# Route to delete a review
@routes.route('/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'}), 200
