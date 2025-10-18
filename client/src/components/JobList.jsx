import { useState } from "react";
import { updateJob } from "../services/jobService";

function JobList({ jobs, onDelete }) {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ title: "", company: "", status: "applied" });

    const handleEdit = (job) => {
        setEditingId(job._id);
        setEditForm(job);
    };

    const handleSave = async (id) => {
        const updated = await updateJob(id, editForm);
        setEditingId(null);
        window.location.reload(); // simple refresh for now
    };

    return (
        <ul className="space-y-2">
        {jobs.map((job) => (
            <li
            key={job._id}
            className="border p-3 flex justify-between items-center rounded"
            >
            {editingId === job._id ? (
                <div className="flex flex-col w-full gap-2">
                <input
                className="border p-1"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
                <input
                className="border p-1"
                value={editForm.company}
                onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                />
                <select
                className="border p-1"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                </select>
                <button
                onClick={() => handleSave(job._id)}
                className="bg-green-500 text-white px-2 py-1 rounded"
                >
                Save
                </button>
                </div>
            ) : (
                <>
                <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-gray-600">{job.company}</p>
                <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                    job.status === "applied"
                    ? "bg-blue-100 text-blue-700"
                    : job.status === "interview"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
                >
                {job.status}
                </span>
                </div>
                <div className="flex gap-2">
                <button
                onClick={() => handleEdit(job)}
                className="text-blue-600 hover:text-blue-800"
                >
                ✎
                </button>
                <button
                onClick={() => onDelete(job._id)}
                className="text-red-600 hover:text-red-800"
                >
                ✕
                </button>
                </div>
                </>
            )}
            </li>
        ))}
        </ul>
    );
}

export default JobList;
