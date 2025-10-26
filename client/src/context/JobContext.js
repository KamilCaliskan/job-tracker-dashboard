import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const fetchJobs = async () => {
        try {
            const res = await axios.get("/api/jobs");
            setJobs(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch jobs.");
        }
    };

    const addJob = async (newJob) => {
        try {
            const res = await axios.post("/api/jobs", newJob);
            setJobs([...jobs, res.data]);
            setMessage("✅ Job added successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add job.");
        }
    };

    const deleteJob = async (id) => {
        try {
            await axios.delete(`/api/jobs/${id}`);
            setJobs(jobs.filter((job) => job._id !== id));
            setMessage("🗑️ Job deleted successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete job.");
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <JobContext.Provider value={{ jobs, addJob, deleteJob, error, message, setError, setMessage }}>
        {children}
        </JobContext.Provider>
    );
};
