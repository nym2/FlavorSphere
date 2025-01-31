import React, { useState, useEffect } from 'react';
import RecipeForm from '../components/RecipeForm'; // Import RecipeForm component
import Navbar from '../components/Header';  // Import Navbar for header integration
import axios from 'axios';  // Import axios

const CreateRecipe = () => {
  const [isLoading, setIsLoading] = useState(false); // To track loading state
  const [error, setError] = useState(null); // To track any error messages
  const [categories, setCategories] = useState([]); // To store categories

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
    setError(null); // Reset error state

    try {
      console.log('Submitting recipe data:', recipeData); // Log the data being submitted

      const response = await axios.post(`${backendUrl}/recipes`, recipeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Recipe created:', response.data); // Log the response from the server

      alert('Recipe created successfully');
    } catch (err) {
      setError(err.message);
      console.error('Error creating recipe:', err);
    } finally {
      setIsLoading(false); // Stop loading after submission
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

        {/* Pass the submit handler and categories to RecipeForm */}
        <RecipeForm
          onSubmit={handleRecipeSubmit}
          categories={categories} // Pass categories to the form
        />
      </div>
    </div>
  );
};

export default CreateRecipe;
