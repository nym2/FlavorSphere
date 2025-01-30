// src/pages/RecipeList.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Header';  // Add Navbar for consistent navigation

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/recipes');  // Updated to remove '/api' prefix
      if (!response.ok) throw new Error('Failed to fetch recipes');
      const data = await response.json();
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`/recipes/${id}`, {  // Updated to remove '/api' prefix
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete recipe');
      alert('Recipe deleted');
      fetchRecipes();
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <div className="recipe-list">
      <Navbar /> {/* Add Navbar */}
      {recipes.length === 0 ? (
        <p>No recipes available</p>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-item">
            <h3>{recipe.name}</h3>
            <p>{recipe.description}</p>
            <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;
