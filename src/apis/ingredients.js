import axios from "axios";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/ingredients";
const addMultipleURL =
  "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/add_or_edit_ingredients";


// Create axios instance with authorization header
const axiosAuthorized = (token) => axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get all ingredients
export const fetchIngredients = (token) => axiosAuthorized(token).get(baseURL);

// Create ingredient
export const createIngredient = (ing) => axiosAuthorized.post(baseURL, ing);

// Update Ingredient
export const updateIngredient = (ing) =>
  axiosAuthorized.post(`${baseURL}/${ing.id}`, ing);

export const deleteIngredient = (id) =>
  axiosAuthorized.delete(`${baseURL}/${id}`);

// Add/edit multiple ingredients
export const createOrEditIngredients = (payload) =>
  axios.post(addMultipleURL, payload);
