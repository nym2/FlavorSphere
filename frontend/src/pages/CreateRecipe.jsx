// src/pages/CreateRecipe.js
import React, { useState } from 'react';
import RecipeForm from '../components/RecipeForm'; // Import RecipeForm component
import Navbar from '../components/Header';  // Import Navbar for header integration

const CreateRecipe = () => {
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track any error messages

  const handleRecipeSubmit = async (recipeData) => {
    setIsLoading(true);  // Set loading to true before submitting
    setError(null); // Reset any previous error

    try {
      const response = await fetch('/recipes', {  // Updated to remove '/api'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error('Error creating recipe');
      }

      alert('Recipe created successfully');
      // Optionally redirect to recipe list after successful creation
      // window.location.href = "/recipes"; 
    } catch (err) {
      setError(err.message); // Display error message if submission fails
    } finally {
      setIsLoading(false); // Reset loading state after the request is complete
    }
  };

  return (
    <div className="create-recipe-container">
      <Navbar /> {/* Integrated Navbar */}
      <div className="create-recipe-box">
        <h2>Create New Recipe</h2>

        {/* Display loading message while form submission is in progress */}
        {isLoading && <p>Loading...</p>}
        
        {/* Display error message if there's any error */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Pass the submit handler to RecipeForm */}
        <RecipeForm onSubmit={handleRecipeSubmit} />
      </div>
    </div>
  );
};

export default CreateRecipe;
