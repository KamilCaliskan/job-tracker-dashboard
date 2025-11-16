import { useState } from "react";

function JobForm({ onSubmit }) {
    const [job, setJob] = useState({
        title: "",
        company: "",
        status: "pending",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(job);
        setJob({ title: "", company: "", status: "pending" });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>

        {/* Title input */}
        <input
        type="text"
        placeholder="Job Title"
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        className="border rounded-lg px-3 py-2 w-full"
        />

        {/* Company input */}
        <input
        type="text"
        placeholder="Company"
        value={job.company}
        onChange={(e) => setJob({ ...job, company: e.target.value })}
        className="border rounded-lg px-3 py-2 w-full"
        />

        {/* Status input */}
        <select
        value={job.status}
        onChange={(e) => setJob({ ...job, status: e.target.value })}
        className="border rounded-lg px-3 py-2 w-full"
        >
        <option value="pending">Pending</option>
        <option value="interview">Interview</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
        </select>

        <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
        Save
        </button>
        </form>
    );
}

export default JobForm;
