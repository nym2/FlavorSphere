import React, { useState, useEffect } from 'react';

const RecipeForm = ({ onSubmit }) => {
  const [categories, setCategories] = useState([]);
  const [recipeData, setRecipeData] = useState({
    name: '',
    description: '',
    category_id: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch('/categories'); // Updated to remove '/api'
    const data = await response.json();
    setCategories(data);
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
    // Pass the form data to the parent (CreateRecipe) component via the onSubmit function
    onSubmit(recipeData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={recipeData.name}
        onChange={handleInputChange}
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
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button type="submit">Create Recipe</button>
    </form>
  );
};

export default RecipeForm;
