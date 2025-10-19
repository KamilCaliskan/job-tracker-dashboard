import React from "react";

const JobList = ({ jobs, setJobs, deleteJobFromAPI, setJob }) => {
    const handleDelete = async (id) => {
        try {
            await deleteJobFromAPI(id);
            setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
        } catch (err) {
            console.error("Failed to delete job:", err);
        }
    };

    const handleEdit = (id) => {
        const jobToEdit = jobs.find(job => job._id === id);
        setJob(jobToEdit);
    };

    return (
        <div>
        {jobs.map(job => (
            <div key={job._id} className="p-2 border-b flex justify-between">
            <div>{job.title} - {job.company}</div>
            <div>
            <button onClick={() => handleEdit(job._id)}>Edit</button>
            <button onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
            </div>
        ))}
        </div>
    );
};

export default JobList;
