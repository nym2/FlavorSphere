import { Link } from "react-router-dom";
import "../styles/main.css";

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <h3>{recipe.name}</h3>
      <p>Category: {recipe.category}</p> 
      <p>Description: {recipe.description}</p>
      <Link to={`/RecipeDetailsPage/${recipe.id}`}>View Details</Link> 
    </div>
  );
}

export default RecipeCard;
