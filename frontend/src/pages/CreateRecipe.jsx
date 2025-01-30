// src/pages/CreateRecipe.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateRecipe = () => {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Fetch available categories
    axios.get('/api/categories')
      .then(response => {
        console.log(response.data);
        // Ensure response data is an array before setting it
        setCategories(Array.isArray(response.data) ? response.data : []);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleSubmit = () => {
    const newRecipe = {
      name: recipeName,
      description,
      categories: selectedCategories,
    };
    axios.post('/api/recipes', newRecipe)
      .then(response => {
        // Redirect to the recipe list or recipe details page
      })
      .catch(error => console.error('Error creating recipe:', error));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategories([...e.target.selectedOptions].map(option => option.value));
  };

  return (
    <div>
      <h1>Create New Recipe</h1>
      <input
        type="text"
        placeholder="Recipe Name"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select multiple onChange={handleCategoryChange}>
        {/* Ensure categories is an array before trying to map */}
        {Array.isArray(categories) && categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Create Recipe</button>
    </div>
  );
};

export default CreateRecipe;
