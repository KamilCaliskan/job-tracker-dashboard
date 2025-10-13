function JobList({ jobs, onDelete }) {
    return (
        <ul className="space-y-2">
        {jobs.map((job) => (
            <li
            key={job._id}
            className="border p-3 flex justify-between items-center rounded"
            >
            <div>
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            </div>
            <button
            onClick={() => onDelete(job._id)}
            className="text-red-600 hover:text-red-800"
            >
            ✕
            </button>
            </li>
        ))}
        </ul>
    );
}

export default JobList;
