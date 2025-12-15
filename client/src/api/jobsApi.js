import axios from "axios";

const API_URL = "http://localhost:5000/api"; // ADD /api

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const login = (email, password) => 
  api.post("/auth/login", { email, password });

// Jobs API - NOTE: paths start with /jobs (not /api/jobs)
export const getJobs = () => api.get("/jobs");
export const addJob = (job) => api.post("/jobs", job);
export const updateJob = (id, job) => api.put(`/jobs/${id}`, job);
export const deleteJob = (id) => api.delete(`/jobs/${id}`);
