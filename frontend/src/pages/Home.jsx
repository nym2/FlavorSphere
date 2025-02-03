// src/pages/HomePage.js
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import Navbar from "../components/Header"; 

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://flavorsphere.onrender.com/recipes")  
      .then((response) => setRecipes(response.data))
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      });
  }, []);

  return (
    <div className="homepage">
      <Navbar /> 
      <h2>All Recipes</h2>
      {error && <p className="error-message">{error}</p>} 
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
