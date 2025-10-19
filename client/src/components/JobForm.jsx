import React, { useState } from "react";

const JobForm = ({ jobs, setJobs, createJobAPI, updateJobAPI, job, setJob }) => {
    const [message, setMessage] = useState("");

    const validate = () => {
        if (!job.title.trim() || !job.company.trim()) {
            setMessage("Title and company are required.");
            return false;
        }
        return true;
    };

    const handleAddJob = async () => {
        if (!validate()) return;
        try {
            const newJob = await createJobAPI(job);
            setJobs(prev => [...prev, newJob]);
            setJob({ title: "", company: "", status: "applied" });
            setMessage("✅ Job added successfully!");
        } catch (err) {
            setMessage("❌ Failed to add job.");
        }
    };

    const handleUpdateJob = async () => {
        if (!validate()) return;
        try {
            const updatedJob = await updateJobAPI(job._id, job);
            setJobs(prev => prev.map(j => j._id === job._id ? updatedJob : j));
            setJob({ title: "", company: "", status: "applied" });
            setMessage("✅ Job updated successfully!");
        } catch (err) {
            setMessage("❌ Failed to update job.");
        }
    };

    return (
        <div className="p-3 border rounded bg-gray-50 mb-4">
        <input
        type="text"
        placeholder="Title"
        value={job.title}
        onChange={e => setJob({ ...job, title: e.target.value })}
        className="border p-1 mr-2"
        />
        <input
        type="text"
        placeholder="Company"
        value={job.company}
        onChange={e => setJob({ ...job, company: e.target.value })}
        className="border p-1 mr-2"
        />
        <select
        value={job.status}
        onChange={e => setJob({ ...job, status: e.target.value })}
        className="border p-1 mr-2"
        >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        </select>

        <button
        onClick={job._id ? handleUpdateJob : handleAddJob}
        className="bg-blue-600 text-white px-3 py-1 rounded"
        >
        {job._id ? "Update Job" : "Add Job"}
        </button>

        {message && <div className="mt-2 text-sm">{message}</div>}
        </div>
    );
};

export default JobForm;
