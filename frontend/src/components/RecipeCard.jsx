import { Link } from "react-router-dom";
import "../styles/main.css";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>Category: {recipe.category}</p>
      <Link to={`/recipes/${recipe.id}`}>View Details</Link> {/* Updated URL */}
    </div>
  );
}

export default RecipeCard;
