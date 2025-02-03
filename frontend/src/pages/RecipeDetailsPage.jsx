import { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Header';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [newReview, setNewReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [reviewError, setReviewError] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editedReviewContent, setEditedReviewContent] = useState('');

  const backendUrl = 'https://flavorsphere.onrender.com';


  useEffect(() => {
    axios.get(`${backendUrl}/recipes`)
      .then(response => {
        console.log("Fetched recipe details:", response.data);
        setRecipe(response.data); // Recipe details are set correctly
      })
      .catch(error => {
        console.error('Error fetching recipe details:', error);
        setError("Failed to load recipe details. Please try again later.");
      });
  }, [id]);


  useEffect(() => {
    axios.get(`${backendUrl}/recipes/${id}/reviews`)
      .then(response => {
        console.log("Fetched reviews:", response.data);
        setReviews(response.data); // Set reviews correctly
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [id]);

  // ✅ Handle adding a new review
  const handleAddReview = () => {
    if (newReview.trim()) {
      axios.post(`${backendUrl}/recipes/${id}/reviews`, { content: newReview })
        .then(response => {
          setReviews([response.data, ...reviews]); // Add new review to state
          setNewReview(''); // Clear input
        })
        .catch(error => {
          console.error('Error submitting review:', error);
          setReviewError("Failed to submit review. Please try again.");
        });
    }
  };

  // ✅ Handle editing a review
  const handleEditReview = (review) => {
    setEditingReview(review.id);
    setEditedReviewContent(review.content);
  };

  // ✅ Handle saving the edited review
  const handleSaveEdit = (reviewId) => {
    axios.put(`${backendUrl}/reviews/${reviewId}`, { content: editedReviewContent })
      .then(() => {
        setReviews(reviews.map(review =>
          review.id === reviewId ? { ...review, content: editedReviewContent } : review
        ));
        setEditingReview(null); // Exit editing mode
      })
      .catch(error => {
        console.error('Error updating review:', error);
      });
  };

  // Handle deleting a review
  const handleDeleteReview = (reviewId) => {
    axios.delete(`${backendUrl}/reviews/${reviewId}`)
      .then(() => {
        setReviews(reviews.filter(review => review.id !== reviewId));
      })
      .catch(error => {
        console.error('Error deleting review:', error);
      });
  };

  return (
    <div>
      <Navbar />
      {error && <p className="error-message">{error}</p>}

      {recipe ? (
        <>
          <h1>{recipe.name}</h1>
          <p><strong>Category:</strong> {recipe.category?.name}</p>
          <p>{recipe.description}</p>

          {reviewError && <p className="error-message">{reviewError}</p>}

          {/* Add a new review section */}
          {!editingReview && (
            <>
              <h3>Add a Review</h3>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button onClick={handleAddReview} disabled={!newReview.trim()}>
                Submit Review
              </button>
            </>
          )}

          {/* Display reviews */}
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
        <p>Loading recipe details...</p>
      )}
    </div>
  );
};

export default RecipeDetails;
