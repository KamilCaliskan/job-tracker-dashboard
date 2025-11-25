import React from "react";

const Pagination = ({ totalJobs = 0, jobsPerPage = 6, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex justify-center items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
            key={p}
            onClick={() => setCurrentPage(p)}
            className={`px-3 py-1 rounded-md border ${
                currentPage === p ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            >
            {p}
            </button>
        ))}
        </div>
    );
};

export default Pagination;
