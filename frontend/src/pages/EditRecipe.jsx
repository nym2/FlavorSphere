import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Header';

const EditRecipe = () => {
  const { id } = useParams(); 
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(id || '');
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryPriority, setCategoryPriority] = useState({});
  const navigate = useNavigate();

  const backendUrl = 'https://flavorsphere.onrender.com'; // Ensure this matches your backend URL

  useEffect(() => {
    // Fetch all recipes
    axios.get(`${backendUrl}/recipes`)
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));

    // Fetch all categories
    axios.get(`${backendUrl}/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedRecipeId) {
      // Fetch the selected recipe details for editing
      axios.get(`${backendUrl}/recipes/${selectedRecipeId}`)
        .then(response => {
          setRecipe(response.data);
          setCategoryPriority(
            response.data.categories.reduce((acc, category) => {
              acc[category.id] = category.priority || 0;
              return acc;
            }, {})
          );
        })
        .catch(error => console.error('Error fetching recipe:', error));
    }
  }, [selectedRecipeId]);

  const handleCategoryPriorityChange = (categoryId, newPriority) => {
    setCategoryPriority({ ...categoryPriority, [categoryId]: newPriority });
  };

  const handleSubmit = () => {
    if (!recipe) return;

    const updatedRecipe = {
      name: recipe.name,
      description: recipe.description,
      category_id: recipe.category_id, // Ensure the correct category ID is attached to the recipe
      categories: categories.map(cat => ({
        id: cat.id,
        priority: categoryPriority[cat.id] || 0, // Send the priority for each category
      })),
    };

    // Update the recipe
    axios.put(`${backendUrl}/recipes/${selectedRecipeId}`, updatedRecipe)
      .then(response => {
        alert('Recipe updated successfully');
        navigate('/recipes'); // Redirect to the recipes list
      })
      .catch(error => console.error('Error updating recipe:', error));
  };

  return (
    <div className="edit-recipe-container">
      <Navbar />
      <h1>Edit Recipe</h1>
      
      <div className="form-container">
        <label>Select Recipe:</label>
        <select 
          value={selectedRecipeId} 
          onChange={(e) => setSelectedRecipeId(e.target.value)} 
          className="select-recipe"
        >
          <option value="">-- Select a Recipe --</option>
          {recipes.map(recipe => (
            <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
          ))}
        </select>

        {recipe ? (
          <>
            <label>Recipe Name:</label>
            <input
              type="text"
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              className="input-field"
            />

            <label>Description:</label>
            <textarea
              value={recipe.description}
              onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
              className="textarea-field"
            />

            <label>Select Categories:</label>
            <select
              multiple
              value={recipe.categories?.map(cat => cat.id) || []}
              onChange={(e) => setRecipe({
                ...recipe,
                categories: [...e.target.selectedOptions].map(option => ({
                  id: option.value,
                  name: option.label,
                })),
              })}
              className="select-categories"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            {recipe.categories?.map(category => (
              <div key={category.id} className="priority-input">
                <label>Priority for {category.name}</label>
                <input
                  type="number"
                  value={categoryPriority[category.id] || 0}
                  onChange={(e) => handleCategoryPriorityChange(category.id, e.target.value)}
                  className="input-priority"
                />
              </div>
            ))}

            <button onClick={handleSubmit} className="submit-btn">Update Recipe</button>
          </>
        ) : (
          <p>Select a recipe to edit</p>
        )}
      </div>
    </div>
  );
};

export default EditRecipe;
