Update jobsApi.js:

import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

export const setAuthHeader = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

export const getJobs = () => axios.get(API_URL);
export const addJob = (job, token) => axios.post(API_URL, job, setAuthHeader(token));
export const updateJob = (id, job, token) => axios.put(`${API_URL}/${id}`, job, setAuthHeader(token));
export const deleteJob = (id, token) => axios.delete(`${API_URL}/${id}`, setAuthHeader(token));
