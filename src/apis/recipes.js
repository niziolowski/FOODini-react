import axios from "axios";

//! Move to env
const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/recipes";

// Create axios instance with authorization header
const authorize = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all recipes
export const fetchRecipes = (token) => axios.get(baseURL, authorize(token));

// Create recipe
export const createRecipe = (rec) => axios.post(baseURL, rec);

// Update recipe
export const updateRecipe = (rec) => axios.post(`${baseURL}/${rec.id}`, rec);

//   Delete recipe
export const deleteRecipe = (id) => axios.delete(`${baseURL}/${id}`);
