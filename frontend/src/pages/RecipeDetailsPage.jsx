// src/pages/RecipeDetails.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  useEffect(() => {
    // Fetch recipe details
    axios.get(`/api/recipes/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => console.error('Error fetching recipe details:', error));

    // Fetch reviews for the recipe
    axios.get(`/api/recipes/${id}/reviews`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, [id]);

  const handleDeleteRecipe = () => {
    axios.delete(`/api/recipes/${id}`)
      .then(() => {
        navigate('/recipes'); // Redirect to recipes list after deletion
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      axios.post(`/api/recipes/${id}/reviews`, { content: newReview })
        .then(response => {
          setReviews([...reviews, response.data]);
          setNewReview('');
        })
        .catch(error => console.error('Error submitting review:', error));
    }
  };

  return (
    <div>
      {recipe ? (
        <>
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
          
          <button onClick={handleDeleteRecipe}>Delete Recipe</button>

          <h2>Reviews</h2>
          {reviews.map(review => (
            <div key={review.id}>
              <p>{review.content}</p>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          ))}

          <h3>Add a Review</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
          />
          <button onClick={handleAddReview}>Submit Review</button>
        </>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
