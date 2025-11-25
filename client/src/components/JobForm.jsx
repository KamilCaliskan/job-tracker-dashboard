import React from "react";

const JobForm = ({ job, setJob, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!job.title?.trim() || !job.company?.trim()) return;
        onSubmit(job);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border">
        <div className="mb-3">
        <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
        <input
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        className="w-full border rounded-md px-3 py-2 text-sm"
        placeholder="Frontend Developer"
        />
        </div>

        <div className="mb-3">
        <label className="block text-xs font-medium text-gray-600 mb-1">Company</label>
        <input
        value={job.company}
        onChange={(e) => setJob({ ...job, company: e.target.value })}
        className="w-full border rounded-md px-3 py-2 text-sm"
        placeholder="Acme Ltd."
        />
        </div>

        <div className="mb-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
        <select
        value={job.status}
        onChange={(e) => setJob({ ...job, status: e.target.value })}
        className="w-full border rounded-md px-3 py-2 text-sm"
        >
        <option value="Pending">Pending</option>
        <option value="Interview">Interview</option>
        <option value="Rejected">Rejected</option>
        </select>
        </div>

        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition font-semibold"
        >
        {job.id || job._id ? "Update Job" : "Add Job"}
        </button>
        </form>
    );
};

export default JobForm;
