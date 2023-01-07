import axios from "axios";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/recipes";


// Create axios instance with authorization header
const axiosAuthorized = (token) => axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get all recipes
export const fetchRecipes = (token) => axiosAuthorized(token).get(baseURL);

// Create recipe
export const createRecipe = (rec) => axiosAuthorized.post(baseURL, rec);

// Update recipe
export const updateRecipe = (rec) =>
  axiosAuthorized.post(`${baseURL}/${rec.id}`, rec);

//   Delete recipe
export const deleteRecipe = (id) => axiosAuthorized.delete(`${baseURL}/${id}`);
