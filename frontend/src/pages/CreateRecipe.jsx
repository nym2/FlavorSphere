import React, { useState, useEffect } from 'react';
import RecipeForm from '../components/RecipeForm'; 
import Navbar from '../components/Header';  
import axios from 'axios';  

const CreateRecipe = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [categories, setCategories] = useState([]); 

  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/categories`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to fetch categories. Please try again later.');
      }
    };

    fetchCategories();
  }, []);

  const handleRecipeSubmit = async (recipeData) => {
    setIsLoading(true);
    setError(null); 

    try {
      console.log('Submitting recipe data:', recipeData); 

      const response = await axios.post(`${backendUrl}/recipes`, recipeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Recipe created:', response.data); 

      alert('Recipe created successfully');

      // Clear the form fields after successful submission
      handleResetForm();  // Reset the form here
    } catch (err) {
      setError(err.message);
      console.error('Error creating recipe:', err);
    } finally {
      setIsLoading(false); 
    }
  };

  // Function to reset the form
  const handleResetForm = () => {
    // Assuming RecipeForm has a method to reset the form, which we pass as a prop
    if (document.querySelector('form')) {
      document.querySelector('form').reset();
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

        {/* Pass the submit handler, categories, and reset function to RecipeForm */}
        <RecipeForm
          onSubmit={handleRecipeSubmit}
          categories={categories} // Pass categories to the form
        />
      </div>
    </div>
  );
};

export default CreateRecipe;
