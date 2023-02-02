import axios from "axios";

// API URL's
const baseURL = process.env.REACT_APP_API_INGREDIENTS_URL;
const addOrEditIngredientsURL =
  process.env.REACT_APP_API_ADD_OR_EDIT_INGREDIENTS;
const updateShoppingListURL =
  process.env.REACT_APP_API_UPDATE_SHOPPING_LIST_URL;
const refillStorageURL = process.env.REACT_APP_API_REFILL_STORAGE_URL;
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
export const createOrEditIngredients = (payload, token) =>
  axios.post(addOrEditIngredientsURL, payload, authorize(token));

// Update shopping-list (clear and write)
export const updateShoppingList = (payload, token) =>
  axios.post(updateShoppingListURL, payload, authorize(token));

// Refill storage:
// 1. add new ingredients to storage
// 2. delete shopping list checked userItems from ingredients
export const refillStorage = (payload, token) =>
  axios.post(refillStorageURL, payload, authorize(token));
