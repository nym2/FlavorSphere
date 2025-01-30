// src/pages/RecipeDetails.js

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
 import Navbar from '../components/Header';  // Integrated Navbar

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch recipe details
    axios.get(`/recipes/${id}`)  // Updated to remove '/api' prefix
      .then(response => setRecipe(response.data))
      .catch(error => {
        console.error('Error fetching recipe details:', error);
        setError("Failed to load recipe details. Please try again later.");
      });

    // Fetch reviews for the recipe
    axios.get(`/recipes/${id}/reviews`)  // Updated to remove '/api' prefix
      .then(response => setReviews(response.data))
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setError("Failed to load reviews. Please try again later.");
      });
  }, [id]);

  const handleDeleteRecipe = () => {
    axios.delete(`/recipes/${id}`)  // Updated to remove '/api' prefix
      .then(() => {
        navigate('/recipes'); // Redirect to recipes list after deletion
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      axios.post(`/recipes/${id}/reviews`, { content: newReview })  // Updated to remove '/api' prefix
        .then(response => {
          setReviews([...reviews, response.data]);
          setNewReview('');
        })
        .catch(error => console.error('Error submitting review:', error));
    }
  };

  return (
    <div>
      <Navbar /> {/* Integrated Navbar */}
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      {recipe ? (
        <>
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
          
          <button onClick={handleDeleteRecipe}>Delete Recipe</button>

          <h2>Reviews</h2>
          {reviews.map(review => (
            <div key={review.id}>
              <p>{review.content}</p>
              <button>Edit</button> {/* Implement edit functionality if needed */}
              <button>Delete</button> {/* Implement delete functionality if needed */}
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
