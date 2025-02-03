import React, { useState, useEffect } from 'react';

const RecipeForm = ({ onSubmit, categories }) => {
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    category_id: ''
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value
    });
  };

  // ✅ Function to reset the form fields
  const resetForm = () => {
    setRecipeData({
      name: '',
      description: '',
      category_id: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeData.name || !recipeData.category_id) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await onSubmit(recipeData, resetForm); // ✅ Pass resetForm to onSubmit in parent component
    } catch (error) {
      setError('Failed to create recipe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      

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
        {isLoading ? "Creating..." : "Create Recipe"}
      </button>
    </form>
  );
};

export default RecipeForm;
