from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__, url_prefix='/')

@main_bp.route('/recipes', methods=['GET'])
def get_recipes():
    recipes = [
        {"id": 1, "title": "Spaghetti Carbonara", "category": "Italian"},
        {"id": 2, "title": "Chicken Tikka Masala", "category": "Indian"}
    ]
    return jsonify(recipes)
