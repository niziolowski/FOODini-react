import axios from "axios";

//! Move to env
const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/ingredients";
const addMultipleURL =
  "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/add_or_edit_ingredients";

const updateShoppingListURL =
  "https://x8ki-letl-twmt.n7.xano.io/api:as7xy9qf/Update-shopping-list";
const refillStorageURL =
  "https://x8ki-letl-twmt.n7.xano.io/api:as7xy9qf/refill-storage";
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
  axios.post(addMultipleURL, payload, authorize(token));

// Update shopping-list (clear and write)
export const updateShoppingList = (payload, token) =>
  axios.post(updateShoppingListURL, payload, authorize(token));

// Refill storage:
// 1. add new ingredients to storage
// 2. delete shopping list checked userItems from ingredients
export const refillStorage = (payload, token) =>
  axios.post(refillStorageURL, payload, authorize(token));
