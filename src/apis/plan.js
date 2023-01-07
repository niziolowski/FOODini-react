import axios from "axios";

const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/plan";

// Create axios instance with authorization header
const axiosAuthorized = (token) => axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Get the plan
export const fetchPlan = (token) => axiosAuthorized(token).get(baseURL);

// Create Week
export const createWeek = (week) => axiosAuthorized.post(baseURL, week);

// Update Week
export const updateWeek = (week) =>
  axiosAuthorized.post(`${baseURL}/${week.id}`, week);

//   Delete week
export const deleteWeek = (id) => axiosAuthorized.delete(`${baseURL}/${id}`);
