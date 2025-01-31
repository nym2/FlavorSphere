import React, { useState, useEffect } from 'react';

const RecipeForm = ({ onSubmit, categories }) => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    category_id: ''
  });
  const [error, setError] = useState(null); // To hold form errors
  const [isLoading, setIsLoading] = useState(false); // To show loading indicator

  // Handle input changes for text fields and select
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation to ensure all fields are filled
    if (!recipeData.name || !recipeData.category_id) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null); // Clear any previous errors
    setIsLoading(true); // Start loading during submission

    // Pass the data to the parent component (handleRecipeSubmit)
    onSubmit(recipeData);

    setIsLoading(false); // Stop loading after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {isLoading && <p>Loading...</p>} {/* Show loading message */}

      {/* Recipe Name */}
      <input
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={recipeData.name}
        onChange={handleInputChange}
        required
      />

      {/* Recipe Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={recipeData.description}
        onChange={handleInputChange}
      />

      {/* Category Dropdown */}
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

      {/* Submit Button */}
      <button type="submit" disabled={isLoading}>
        Create Recipe
      </button>
    </form>
  );
};

export default RecipeForm;
