// ./src/pages/RecipeDetailsPage
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Header';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [error, setError] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewContent, setEditedReviewContent] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const backendUrl = 'http://localhost:5000';

  useEffect(() => {
    // Fetch recipe details
    axios.get(`${backendUrl}/recipes/${id}`)
      .then(response => setRecipe(response.data))
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
          fetchReviews();  // Fetch the updated reviews from the backend
        })
        .catch(error => {
          console.error('Error submitting review:', error);
          setReviewError("Failed to submit review. Please try again.");
        });
    }
  };  
  
  const fetchReviews = () => {
    axios.get(`${backendUrl}/recipes/${id}`)
      .then(response => {
        setReviews(response.data.reviews); // Make sure we're setting `reviews` correctly
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setReviewError("Failed to load reviews. Please try again later.");
      });
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
    setEditingReview(review.id);
    setEditedReviewContent(review.content);
  };

  const handleSaveEdit = (reviewId) => {
    // Prepare the data to be sent to the backend
    const updatedReviewData = { content: editedReviewContent };
  
    // Send a PUT request to the backend to update the review
    axios.put(`${backendUrl}/reviews/${reviewId}`, updatedReviewData)
      .then((response) => {
        // Successfully updated the review, now update the local state
        setReviews(reviews.map(review =>
          review.id === reviewId ? { ...review, content: editedReviewContent } : review
        ));
        setEditingReview(null);  // Clear the editing state
      })
      .catch((error) => {
        // Handle errors
        console.error('Error updating review:', error.response || error);
        setReviewError("Failed to update review. Please try again.");
      });
  };
  

  return (
    <div>
      <Navbar />
      {error && <p className="error-message">{error}</p>}
      {recipe ? (
        <>
          <h1>{recipe.name}</h1>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p>{recipe.description}</p>

          {reviewError && <p className="error-message">{reviewError}</p>}

          {reviewSubmitted ? (
            <>
              <h2>Reviews</h2>
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review.id}>
                    {editingReview === review.id ? (
                      <>
                        <textarea
                          value={editedReviewContent}
                          onChange={(e) => setEditedReviewContent(e.target.value)}
                        />
                        <button onClick={() => handleSaveEdit(review.id)}>Save</button>
                        <button onClick={() => setEditingReview(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <p>{review.content}</p>
                        <button onClick={() => handleEditReview(review)}>Edit</button>
                        <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </>
          ) : (
            <>
              <h3>Add a Review</h3>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button onClick={handleAddReview}>Submit Review</button>
            </>
          )}
        </>
      ) : (
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
