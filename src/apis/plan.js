import axios from "axios";

// API URL's
const BASE_URL = process.env.REACT_APP_API_PLAN_URL;
const RECALCULATE_PLAN_URL = process.env.REACT_APP_API_RECALCULATE_PLAN_URL;

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

export const uploadPlanChanges = (payload, token) =>
  axios.post(RECALCULATE_PLAN_URL, payload, authorize(token));
