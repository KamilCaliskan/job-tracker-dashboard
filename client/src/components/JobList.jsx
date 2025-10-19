import React from "react";

const JobList = ({ jobs, setJobs, deleteJobFromAPI, setJob, job }) => {
    const handleDelete = async (id) => {
        try {
            await deleteJobFromAPI(id);
            setJobs(prev => prev.filter(j => j._id !== id));
        } catch (err) {
            console.error("Failed to delete job:", err);
        }
    };

    const handleEdit = (id) => {
        const jobToEdit = jobs.find(j => j._id === id);
        setJob(jobToEdit);
    };

    return (
        <div className="space-y-2">
        {jobs.map(j => (
            <div
            key={j._id}
            className={`p-2 border rounded flex justify-between items-center
                ${job._id === j._id ? "bg-yellow-100 border-yellow-400" : "bg-white"}`}
                >
                <div>
                <strong>{j.title}</strong> – {j.company}
                <span className="text-sm text-gray-600 ml-2">({j.status})</span>
                </div>

                <div className="space-x-2">
                <button
                onClick={() => handleEdit(j._id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                Edit
                </button>
                <button
                onClick={() => handleDelete(j._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
                >
                Delete
                </button>
                </div>
                </div>
        ))}
        </div>
    );
};

export default JobList;
