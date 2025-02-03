import React, { useState, useEffect } from 'react';
import RecipeForm from '../components/RecipeForm'; 
import Navbar from '../components/Header';  
import axios from 'axios';  

const CreateRecipe = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [categories, setCategories] = useState([]); 

  // Correctly define the backend URL
  const backendUrl = 'https://flavorsphere.onrender.com'; // Confirm this URL is live

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/categories`);
        setCategories(response.data); // Set categories on success
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  // Handle recipe form submission
  const handleRecipeSubmit = async (recipeData, resetForm) => {
    setIsLoading(true);
    setError(null); 

    try {
      console.log('Submitting recipe data:', recipeData);

      // Send POST request to backend
      const response = await axios.post(`${backendUrl}/recipes`, recipeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const newRecipeId = response.data.id; // Get the assigned recipe ID
      console.log('Recipe created with ID:', newRecipeId);

      alert(`Recipe created successfully! ID: ${newRecipeId}`);

      resetForm(); // Reset form fields after success
    } catch (err) {
      setError('Error creating recipe: ' + err.message); // Display the error message
      console.error('Error creating recipe:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-recipe-container">
      <Navbar />
      <div className="create-recipe-box">
        <h2>Create New Recipe</h2>

        {isLoading && <p>Loading...</p>} {/* Show loading indicator */}
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message */}

        {/* Render the form component with categories and submit handler */}
        <RecipeForm onSubmit={handleRecipeSubmit} categories={categories} />
      </div>
    </div>
  );
};

export default CreateRecipe;
