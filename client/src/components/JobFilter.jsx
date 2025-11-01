import React from "react";

const JobFilter = ({ search, setSearch, statusFilter, setStatusFilter }) => {
    return (
        <div className="flex flex-col md:flex-row gap-3 items-center mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or company..."
            className="border rounded-lg px-3 py-2 w-full md:w-1/2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full md:w-1/4"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
          </select>
         </div>
    );
};

export default JobFilter;
