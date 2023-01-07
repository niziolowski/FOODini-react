import axios from "axios";

//! Move to env
const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/ingredients";
const addMultipleURL =
  "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/add_or_edit_ingredients";

// Create axios instance with authorization header
const authorize = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all ingredients
export const fetchIngredients = (token) => axios.get(baseURL, authorize(token));

// Create ingredient
export const createIngredient = (ing) => axios.post(baseURL, ing);

// Update Ingredient
export const updateIngredient = (ing) =>
  axios.post(`${baseURL}/${ing.id}`, ing);

export const deleteIngredient = (id) => axios.delete(`${baseURL}/${id}`);

// Add/edit multiple ingredients
export const createOrEditIngredients = (payload) =>
  axios.post(addMultipleURL, payload);
