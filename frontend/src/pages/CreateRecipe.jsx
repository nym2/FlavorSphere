import React from 'react';
import RecipeForm from '../components/RecipeForm.jsx';  // Import the RecipeForm component

const CreateRecipe = () => {
  const handleRecipeSubmit = async (recipeData) => {
    const response = await fetch('/recipes', {  // Updated to remove '/api'
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });

    if (response.ok) {
      alert('Recipe created successfully');
    } else {
      alert('Error creating recipe');
    }
  };

  return (
    <div className="create-recipe-container">
      <div className="create-recipe-box">
        <h2>Create New Recipe</h2>
        <RecipeForm onSubmit={handleRecipeSubmit} /> {/* Pass the submit handler to RecipeForm */}
      </div>
    </div>
  );
};

export default CreateRecipe;
