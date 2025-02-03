import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Header';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);

  const backendUrl = 'https://flavorsphere.onrender.com';

  useEffect(() => {
    // Fetch recipe details
    axios.get(`${backendUrl}/recipes`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
        setError("Failed to load recipe details. Please try again later.");
      });
  }, [id]);

  const handleAddReview = () => {
    if (newReview.trim()) {
      axios.post(`${backendUrl}/recipes/${id}/reviews`, { content: newReview })
        .then(response => {
          setNewReview('');
          setReviewSubmitted(true); // Mark that a review has been submitted
          alert("Review added successfully!");

          // Update reviews state to include the new review
          setReviews(prevReviews => [response.data, ...prevReviews]); // Add the new review to the state
        })
        .catch(error => {
          console.error('Error submitting review:', error);
          setReviewError("Failed to submit review. Please try again.");
        });
    }
  };

  const handleDeleteReview = (reviewId) => {
    axios.delete(`${backendUrl}/reviews/${reviewId}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== reviewId));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
        setReviewError("Failed to delete review. Please try again.");
      });
  };

  const handleEditReview = (review) => {
    const updatedReviewContent = prompt("Edit your review:", review.content);
    if (updatedReviewContent) {
      axios.put(`${backendUrl}/reviews/${review.id}`, { content: updatedReviewContent })
        .then(() => {
          setReviews(reviews.map(r =>
            r.id === review.id ? { ...r, content: updatedReviewContent } : r
          ));
        })
        .catch((error) => {
          console.error('Error updating review:', error);
          setReviewError("Failed to update review. Please try again.");
        });
    }
  };

  return (
    <div>
      <Navbar />
      {error && <p className="error-message">{error}</p>}
      {recipe ? (
        <>
          <h1>{recipe.name}</h1>
          <p><strong>Categories:</strong> {recipe.categories?.map(category => category.name).join(', ')}</p>
          <p>{recipe.description}</p>

          {reviewError && <p className="error-message">{reviewError}</p>}

          {reviewSubmitted ? (
            <div>
              <h2>Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id}>
                    <p>{review.content}</p>
                    <button onClick={() => handleEditReview(review)}>Edit</button>
                    <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          ) : (
            <div>
              <h3>Add a Review</h3>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button onClick={handleAddReview} disabled={!newReview.trim()}>
                Submit Review
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
