// ./api/recipes.js
import axios from "axios";

const API_URL = "http://127.0.0.1:5000/recipes"; // No '/api' in the URL

export const getRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
