import axios from "axios";

// API URL's
const BASE_URL = process.env.REACT_APP_API_INGREDIENTS_URL;
const ADD_OR_EDIT_INGREDIENTS_URL =
  process.env.REACT_APP_API_ADD_OR_EDIT_INGREDIENTS_URL;
const UPDATE_SHOPPING_LIST_URL =
  process.env.REACT_APP_API_UPDATE_SHOPPING_LIST_URL;
const REFILL_STORAGE_URL = process.env.REACT_APP_API_REFILL_STORAGE_URL;

// Create axios instance with authorization header
const authorize = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all ingredients
export const fetchIngredients = (token) =>
  axios.get(BASE_URL, authorize(token));

// Create ingredient
export const createIngredient = (ing) => axios.post(BASE_URL, ing);

// Update Ingredient
export const updateIngredient = (ing) =>
  axios.post(`${BASE_URL}/${ing.id}`, ing);

export const deleteIngredient = (id) => axios.delete(`${BASE_URL}/${id}`);

// Add/edit multiple ingredients
export const createOrEditIngredients = (payload, token) =>
  axios.post(ADD_OR_EDIT_INGREDIENTS_URL, payload, authorize(token));

// Update shopping-list (clear and write)
export const updateShoppingList = (payload, token) =>
  axios.post(UPDATE_SHOPPING_LIST_URL, payload, authorize(token));

// Refill storage:
// 1. add new ingredients to storage
// 2. delete shopping list checked userItems from ingredients
export const refillStorage = (payload, token) =>
  axios.post(REFILL_STORAGE_URL, payload, authorize(token));
