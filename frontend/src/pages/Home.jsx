// src/pages/HomePage.js
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/recipes")  // Updated to remove '/api' prefix
      .then((response) => setRecipes(response.data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="homepage">
      <h2>All Recipes</h2>
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        ) : (
          <p>Loading recipes...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
