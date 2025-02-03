import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Header';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState(id || '');
  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);

  const backendUrl = 'https://flavorsphere.onrender.com'; 

  useEffect(() => {
    axios.get(`${backendUrl}/recipes`)
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));

    axios.get(`${backendUrl}/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {
    if (selectedRecipeId) {
      axios.get(`${backendUrl}/recipes/${selectedRecipeId}`)
        .then(response => {
          setRecipe({
            ...response.data,
            category_id: response.data.category?.id || '',
          });
        })
        .catch(error => console.error('Error fetching recipe:', error));
    }
  }, [selectedRecipeId]);

  const handleSubmit = () => {
    if (!recipe) return;

    const updatedRecipe = {
      name: recipe.name,
      description: recipe.description,
      category_id: recipe.category_id, // Ensuring the category ID is attached
    };

    // Update the recipe
    axios.put(`${backendUrl}/recipes/${selectedRecipeId}`, updatedRecipe)
      .then(() => {
        alert('Recipe updated successfully');
        navigate('/recipes'); // Redirect to the recipes list after successful update
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

            <label>Select Category:</label>
            <select
              value={recipe.category_id || ''}
              onChange={(e) => setRecipe({ ...recipe, category_id: e.target.value })}
              className="select-categories"
            >
              <option value="">-- Select a Category --</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

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
