import React, { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import { getJobsFromAPI, addJobToAPI, updateJobInAPI, deleteJobFromAPI } from "./api/jobs";

const App = () => {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({ title: "", company: "", status: "pending" });

    // Load jobs once when component mounts
    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            const data = await getJobsFromAPI();
            setJobs(data);
        } catch (err) {
            console.error("Failed to load jobs:", err);
        }
    };

    // Add new job
    const handleAddJob = async (newJob) => {
        const created = await addJobToAPI(newJob);
        setJobs((prev) => [...prev, created]); // refresh list
    };

    // Update existing job
    const handleUpdateJob = async (updatedJob) => {
        const updated = await updateJobInAPI(updatedJob);
        setJobs((prev) =>
        prev.map((j) => (j._id === updated._id ? updated : j))
        );
        setJob({ title: "", company: "", status: "pending" });
    };

    // Delete job
    const handleDeleteJob = async (id) => {
        await deleteJobFromAPI(id);
        setJobs((prev) => prev.filter((j) => j._id !== id));
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Job Tracker Dashboard</h1>
        <JobForm
        job={job}
        setJob={setJob}
        handleAddJob={handleAddJob}
        handleUpdateJob={handleUpdateJob}
        />
        <JobList
        jobs={jobs}
        job={job}
        setJob={setJob}
        deleteJobFromAPI={handleDeleteJob}
        />
        </div>
    );
};

export default App;
