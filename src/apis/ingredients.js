import axios from "axios";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/ingredients";

const axiosAuthorized = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

export const fetchIngredients = () => axiosAuthorized.get(baseURL);

export const createIngredient = (ing) => axiosAuthorized.post(baseURL, ing);
