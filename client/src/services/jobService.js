import axios from "axios";

const API_URL = "/api/jobs";

export const getJobs = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

export const addJob = async (jobData) => {
    const res = await axios.post(API_URL, jobData);
    return res.data;
};

export const deleteJob = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
};

export const updateJob = async (id, jobData) => {
    const res = await axios.put(`${API_URL}/${id}`, jobData);
    return res.data;
};
