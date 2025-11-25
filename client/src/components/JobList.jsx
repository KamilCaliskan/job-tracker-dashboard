import React from "react";

const JobList = ({ jobs = [], onEdit, onDelete }) => {
    if (!jobs.length) {
        return <div className="p-4 text-center text-gray-500">No jobs found.</div>;
    }

    return (
        <div className="space-y-3">
        {jobs.map((j) => (
            <div
            key={j.id || j._id}
            className="flex items-center justify-between bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
            <div className="min-w-0">
            <div className="flex items-center gap-3">
            <div className="text-sm font-semibold text-slate-800 truncate">{j.title}</div>
            <div className="text-xs text-gray-400">•</div>
            <div className="text-sm text-gray-500 truncate">{j.company}</div>
            </div>
            <span
            className={`inline-block px-2 py-0.5 mt-1 rounded-full text-xs font-medium ${
                j.status === "Interview"
                ? "bg-yellow-100 text-yellow-800"
                : j.status === "Rejected"
                ? "bg-red-100 text-red-800"
                : "bg-blue-100 text-blue-800"
            }`}
            >
            {j.status}
            </span>
            </div>

            <div className="flex items-center gap-2">
            <button
            onClick={() => onEdit(j)}
            className="text-sm bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
            >
            Edit
            </button>
            <button
            onClick={() => onDelete(j.id || j._id)}
            className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded-md hover:bg-red-100 transition"
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
