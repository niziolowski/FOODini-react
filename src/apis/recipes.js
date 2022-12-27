import axios from "axios";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/recipes";

// Get authToken from local storage
const user = JSON?.parse(localStorage.getItem("user"));
const token = user?.token;

// Create axios instance with authorization header
const axiosAuthorized = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get all recipes
export const fetchRecipes = () => axiosAuthorized.get(baseURL);

// Create recipe
export const createRecipe = (rec) => axiosAuthorized.post(baseURL, rec);

// Update recipe
export const updateRecipe = (rec) =>
  axiosAuthorized.post(`${baseURL}/${rec.id}`, rec);

//   Delete recipe
export const deleteRecipe = (id) => axiosAuthorized.delete(`${baseURL}/${id}`);
