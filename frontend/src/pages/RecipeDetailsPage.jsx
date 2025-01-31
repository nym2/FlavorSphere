import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Header';  

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);


  const backendUrl = 'http://localhost:5000'; 

  useEffect(() => {
    // Fetch recipe details
    axios.get(`${backendUrl}/recipes/${id}`)  
      .then(response => setRecipe(response.data))
      .catch(error => {
        console.error('Error fetching recipe details:', error);
        setError("Failed to load recipe details. Please try again later.");
      });

    // Fetch reviews for the recipe
    axios.get(`${backendUrl}/recipes/${id}/reviews`)  // Updated to use backend URL
      .then(response => setReviews(response.data))
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setError("Failed to load reviews. Please try again later.");
      });
  }, [id]);

  const handleDeleteRecipe = () => {
    axios.delete(`${backendUrl}/recipes/${id}`)  
      .then(() => {
        navigate('/recipes'); 
      })
      .catch(error => console.error('Error deleting recipe:', error));
  };

  const handleAddReview = () => {
    if (newReview.trim()) {
      axios.post(`${backendUrl}/recipes/${id}/reviews`, { content: newReview })  
        .then(response => {
          setReviews([...reviews, response.data]);
          setNewReview('');
        })
        .catch(error => console.error('Error submitting review:', error));
    }
  };

  return (
    <div>
      <Navbar /> 
      {error && <p className="error-message">{error}</p>} 
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
