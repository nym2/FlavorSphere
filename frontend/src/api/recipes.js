// ./api/recipes.js
import axios from "axios";

const API_URL = "https://flavorsphere.onrender.com/recipes"; 

export const getRecipes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
