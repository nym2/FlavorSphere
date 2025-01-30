// src/pages/EditRecipe.js

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryPriority, setCategoryPriority] = useState({});

  useEffect(() => {
    // Fetch recipe details and categories
    axios.get(`/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
        setSelectedCategories(response.data.categories.map(cat => cat.id));
        setCategoryPriority(
          response.data.categories.reduce((acc, category) => {
            acc[category.id] = category.priority || 0;
            return acc;
          }, {})
        );
      })
      .catch(error => console.error('Error fetching recipe:', error));

    axios.get('/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, [id]);

  const handleCategoryPriorityChange = (categoryId, newPriority) => {
    setCategoryPriority({ ...categoryPriority, [categoryId]: newPriority });
  };

  const handleSubmit = () => {
    const updatedRecipe = {
      ...recipe,
      categories: selectedCategories.map(id => ({
        id,
        priority: categoryPriority[id],
      })),
    };
    axios.put(`/api/recipes/${id}`, updatedRecipe)
      .then(response => {
        // Redirect to recipe details or list page
      })
      .catch(error => console.error('Error updating recipe:', error));
  };

  return (
    <div>
      {recipe ? (
        <>
          <h1>Edit Recipe</h1>
          <input
            type="text"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
          />
          <textarea
            value={recipe.description}
            onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
          />
          <select multiple value={selectedCategories} onChange={(e) => setSelectedCategories([...e.target.selectedOptions].map(option => option.value))}>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {selectedCategories.map(categoryId => (
            <div key={categoryId}>
              <label>Priority for {categories.find(cat => cat.id === categoryId)?.name}</label>
              <input
                type="number"
                value={categoryPriority[categoryId] || 0}
                onChange={(e) => handleCategoryPriorityChange(categoryId, e.target.value)}
              />
            </div>
          ))}
          <button onClick={handleSubmit}>Update Recipe</button>
        </>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default EditRecipe;
