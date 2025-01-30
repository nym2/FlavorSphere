from flask import Blueprint, request, jsonify
from .models import db, Category, Recipe, Review

routes = Blueprint('routes', __name__)

# Route to get all categories
@routes.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify([{'id': category.id, 'name': category.name, 'priority': category.priority} for category in categories])

# Route to create a new recipe
@routes.route('/api/recipes', methods=['POST'])
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
@routes.route('/api/recipes/<int:id>', methods=['GET'])
def get_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    return jsonify({
        'id': recipe.id,
        'name': recipe.name,
        'description': recipe.description,
        'category': recipe.category.name,
        'reviews': [{'id': review.id, 'content': review.content} for review in recipe.reviews]
    })

# Route to delete a recipe
@routes.route('/api/recipes/<int:id>', methods=['DELETE'])
def delete_recipe(id):
    recipe = Recipe.query.get_or_404(id)
    db.session.delete(recipe)
    db.session.commit()
    return jsonify({'message': 'Recipe deleted successfully'})

# Route to add a review for a recipe
@routes.route('/api/recipes/<int:id>/reviews', methods=['POST'])
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
@routes.route('/api/reviews/<int:id>', methods=['DELETE'])
def delete_review(id):
    review = Review.query.get_or_404(id)
    db.session.delete(review)
    db.session.commit()
    return jsonify({'message': 'Review deleted successfully'})
