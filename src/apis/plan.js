import axios from "axios";

//! Move to env
const baseURL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/plan";

// Create axios instance with authorization header
const authorize = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get the plan
export const fetchPlan = (token) => axios.get(baseURL, authorize(token));

// Create Week
export const createWeek = (week) => axios.post(baseURL, week);

// Update Week
export const updateWeek = (week) => axios.post(`${baseURL}/${week.id}`, week);

//   Delete week
export const deleteWeek = (id) => axios.delete(`${baseURL}/${id}`);
