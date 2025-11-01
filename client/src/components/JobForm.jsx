import React, { useState } from "react";

const JobForm = ({ jobs, setJobs, createJobAPI, updateJobAPI, job, setJob }) => {
    const [message, setMessage] = useState("");

    const validate = () => {
        if (!job.title.trim() || !job.company.trim()) {
            setMessage("⚠️ Title and company are required.");
            return false;
        }
        return true;
    };

    const handleAddJob = async () => {
        if (!validate()) return;
        try {
            const newJob = await createJobAPI(job);
            setJobs(prev => [...prev, newJob]);
            setJob({ title: "", company: "", status: "pending" });
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
            setJob({ title: "", company: "", status: "pending" });
            setMessage("✅ Job updated successfully!");
        } catch (err) {
            setMessage("❌ Failed to update job.");
        }
    };

    return (
        <div className="bg-gray-50 border p-4 rounded-xl shadow-sm">
          {/* 🔹 Outer container with light background and border */}

          <form className="flex flex-col gap-3">
          {/* 🔹 Flex column layout with gaps between inputs */}

        <input
        type="text"
        placeholder="Job Title"
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        className="border p-1 mr-2"
        />
        <input
        type="text"
        placeholder="Company"
        value={job.company}
        onChange={e => setJob({ ...job, company: e.target.value })}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        />
        {/* 🔹 Job title input with rounded edges and focus effect */}

        <input
          type="text"
          placeholder="Company"
          value={job.company}
          onChange={(e) => setJob({..job, company: e.target.value })}
          clasName="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {/* 🔹 Company input */}

        <select
        value={job.status}
        onChange={e => setJob({ ...job, status: e.target.value })}
        className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
        >

        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="hired">Hired</option>
        <option value="rejected">Rejected</option>
        </select>
        {/* 🔹 Job status dropdown */}

        <button
        type:"button"
        onClick={job._id ? handleUpdateJob : handleAddJob}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          {job._id ? "Update Job" : "Add Job"}
        </button>
        {/* 🔹 Button changes text and action based on whether job._id exists */}

        </form>

        {message && <div className="mt-2 text-sm">{message}</div>}
        {/* 🔹 Displays feedback message below the form */}

        </div>
    );
};

export default JobForm;
