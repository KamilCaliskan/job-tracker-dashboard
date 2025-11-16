import React from "react";

const JobList = ({ jobs, setJobs, deleteJobFromAPI, setJob, job }) => {

    // DELETE
    const handleDelete = async (id) => {
        try {
            await deleteJobFromAPI(id); // backend delete
            setJobs(prev => prev.filter(j => j._id !== id)); // frontend update
        } catch (err) {
            console.error("❌ Failed to delete job:", err);
        }
    };

    // EDIT
    const handleEdit = (id) => {
        const jobToEdit = jobs.find(j => j._id === id);
        setJob(jobToEdit); // form'a doldurur
    };

    return (
        <div className="space-y-3">
        {jobs.map((j) => (
            <div
            key={j._id}
            className={`flex justify-between items-center border rounded-lg p-3 shadow-sm hover:shadow transition ${
                job._id === j._id ? "bg-yellow-50 border-yellow-300" : "bg-white"
            }`}
            >
            <div>
            <h3 className="font-medium">{j.title}</h3>
            <p className="text-sm text-gray-500">{j.company}</p>
            </div>

            <div className="space-x-2">
            {/* EDIT BUTTON */}
            <button
            onClick={() => handleEdit(j._id)}
            className="text-blue-600 hover:underline"
            >
            Edit
            </button>

            {/* DELETE BUTTON */}
            <button
            onClick={() => handleDelete(j._id)}
            className="text-red-600 hover:underline"
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
