import React, { useState, useEffect } from 'react';

const RecipeForm = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    category_id: ''
  });
  const [error, setError] = useState(null); // To hold form errors
  const [isLoading, setIsLoading] = useState(false); // To show loading indicator

  // Fetch categories from the backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch('/categories'); // Correct endpoint for categories
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    } finally {
      setIsLoading(false); // Stop loading after fetch
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!recipeData.name || !recipeData.category_id) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null); // Clear any previous errors
    setIsLoading(true); // Start loading during submission

    try {
      const response = await fetch('/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const newRecipe = await response.json();
      onSubmit(newRecipe); // Pass the new recipe to the parent component
    } catch (err) {
      setError('Failed to create recipe');
    } finally {
      setIsLoading(false); // Stop loading after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {isLoading && <p>Loading...</p>} {/* Show loading message */}

      <input
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={recipeData.name}
        onChange={handleInputChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={recipeData.description}
        onChange={handleInputChange}
      />
      <select
        name="category_id"
        value={recipeData.category_id}
        onChange={handleInputChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isLoading}>
        Create Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
