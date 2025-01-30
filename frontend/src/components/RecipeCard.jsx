// src/components/RecipeCard.js
import { Link } from "react-router-dom";
import "../styles/main.css";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3> {/* Use recipe.name instead of recipe.title */}
      <p>Category: {recipe.category.name}</p> {/* Assuming category is an object with a name */}
      <Link to={`/recipes/${recipe.id}`}>View Details</Link> {/* Updated URL */}
    </div>
  );
}

export default RecipeCard;
