import axios from "axios";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/ingredients";

// Get authToken from local storage
const user = localStorage.getItem("user");
const { token } = user ? JSON.parse(user) : null;

// Create axios instance with authorization header
const axiosAuthorized = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get all ingredients
export const fetchIngredients = () => axiosAuthorized.get(baseURL);

// Create ingredient
export const createIngredient = (ing) => axiosAuthorized.post(baseURL, ing);

// Update Ingredient
export const updateIngredient = (ing) =>
  axiosAuthorized.post(`${baseURL}/${ing.id}`, ing);

export const deleteIngredient = (id) =>
  axiosAuthorized.delete(`${baseURL}/${id}`);
