import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Header';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("https://flavorsphere.onrender.com/recipes");  
      setRecipes(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const deleteRecipe = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://flavorsphere.onrender.com/recipes/${id}`);  
        if (response.status === 200) {
          setRecipes(recipes.filter(recipe => recipe.id !== id));  // Update state directly after deletion
          alert('Recipe deleted');
        }
      } catch (error) {
        alert('Error deleting recipe: ' + error.message);
      }
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
      <Navbar /> 
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
