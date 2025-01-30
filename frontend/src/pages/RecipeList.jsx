// src/pages/RecipeList.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  // Fetch the list of recipes from the API
  useEffect(() => {
    fetch('/api/recipes')  // Adjust the API URL based on your backend setup
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  // Handle deleting a recipe
  const deleteRecipe = (id) => {
    fetch(`/api/recipes/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setRecipes(recipes.filter((recipe) => recipe.id !== id));
        } else {
          console.error('Error deleting recipe');
        }
      })
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <div>
                <Link to={`/recipes/${recipe.id}`}>View Details</Link> |{' '}
                <Link to={`/edit-recipe/${recipe.id}`}>Edit</Link> |{' '}
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default RecipeList;
