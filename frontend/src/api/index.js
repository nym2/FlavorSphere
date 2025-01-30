import axios from 'axios';

const API_URL = 'http://localhost:5000';  // URL of your Flask backend

// Get all categories
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Create a new category
export const createCategory = async (category) => {
  try {
    const response = await axios.post(`${API_URL}/categories`, category);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
  }
};

// Update an existing category
export const updateCategory = async (id, updatedCategory) => {
  try {
    const response = await axios.put(`${API_URL}/categories/${id}`, updatedCategory);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
  }
};

// Create a new recipe
export const createRecipe = async (recipe) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, recipe);
    return response.data;
  } catch (error) {
    console.error("Error creating recipe:", error);
  }
};

// Update an existing recipe
export const updateRecipe = async (id, updatedRecipe) => {
  try {
    const response = await axios.put(`${API_URL}/recipes/${id}`, updatedRecipe);
    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);
  }
};

// Update an existing review
export const updateReview = async (id, updatedReview) => {
  try {
    const response = await axios.put(`${API_URL}/reviews/${id}`, updatedReview);
    return response.data;
  } catch (error) {
    console.error("Error updating review:", error);
  }
};
