// src/pages/HomePage.js
import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import Navbar from "../components/Header"; // Import Navbar for header integration

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/recipes")  // Updated to remove '/api' prefix
      .then((response) => setRecipes(response.data))
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      });
  }, []);

  return (
    <div className="homepage">
      <Navbar /> {/* Integrated Navbar */}
      <h2>All Recipes</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
