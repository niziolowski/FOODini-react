import axios from "axios";

//! Move to env
const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:P_BSkInF/plan";
const CUSTOMS_URL =
  "https://x8ki-letl-twmt.n7.xano.io/api:as7xy9qf/editMultipleWeeks";

// Create axios instance with authorization header
const authorize = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// BASIC CRUD

// Get the plan
export const fetchPlan = (token) => axios.get(BASE_URL, authorize(token));

// Create Week
export const createWeek = (week) => axios.post(BASE_URL, week);

// Update Week
export const updateWeek = (week) => axios.post(`${BASE_URL}/${week.id}`, week);

//   Delete week
export const deleteWeek = (id) => axios.delete(`${BASE_URL}/${id}`);

// CUSTOM CALLS

// Update multiple weeks
// payload = array of weeks to update
export const updateMultipleWeeks = (payload, token) =>
  axios.post(CUSTOMS_URL, payload, authorize(token));
