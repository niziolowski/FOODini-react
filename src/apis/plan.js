import axios from "axios";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/plan";

// Get authToken from local storage
const user = JSON?.parse(localStorage.getItem("user"));
const token = user?.token;

// Create axios instance with authorization header
const axiosAuthorized = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get the plan
export const fetchPlan = () => axiosAuthorized.get(baseURL);

// Create Week
export const createWeek = (week) => axiosAuthorized.post(baseURL, week);

// Update Week
export const updateWeek = (week) =>
  axiosAuthorized.post(`${baseURL}/${week.id}`, week);

//   Delete week
export const deleteWeek = (id) => axiosAuthorized.delete(`${baseURL}/${id}`);
