import React, { useState, useEffect } from 'react';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    const response = await fetch('/recipes');  // Updated to remove '/api' prefix
    const data = await response.json();
    setRecipes(data);
  };

  const deleteRecipe = async (id) => {
    const response = await fetch(`/recipes/${id}`, {  // Updated to remove '/api' prefix
      method: 'DELETE'
    });

    if (response.ok) {
      alert('Recipe deleted');
      fetchRecipes();
    }
  };

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-item">
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
          <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
