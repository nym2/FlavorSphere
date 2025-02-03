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
  const [reviews, setReviews] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryPriority, setCategoryPriority] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => console.error('Error fetching recipes:', error));

    axios.get('http://localhost:5000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error('Error fetching categories:', error));

    axios.get('http://localhost:5000/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  useEffect(() => {
    if (selectedRecipeId) {
      axios.get(`http://localhost:5000/recipes/${selectedRecipeId}`)
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
    }
  }, [selectedRecipeId]);

  const handleCategoryPriorityChange = (categoryId, newPriority) => {
    setCategoryPriority({ ...categoryPriority, [categoryId]: newPriority });
  };

  const handleSubmit = () => {
    const updatedRecipe = {
      ...recipe,
      categories: selectedCategories.map(id => ({
        id,
        priority: categoryPriority[id] || 0,
      })),
    };

    axios.put(`http://localhost:5000/recipes/${selectedRecipeId}`, updatedRecipe)
      .then(response => {
        alert('Recipe updated successfully');
        navigate('/recipes'); 
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
              value={selectedCategories}
              onChange={(e) => setSelectedCategories([...e.target.selectedOptions].map(option => option.value))}
              className="select-categories"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>

            {selectedCategories.map(categoryId => (
              <div key={categoryId} className="priority-input">
                <label>Priority for {categories.find(cat => cat.id === categoryId)?.name}</label>
                <input
                  type="number"
                  value={categoryPriority[categoryId] || 0}
                  onChange={(e) => handleCategoryPriorityChange(categoryId, e.target.value)}
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
