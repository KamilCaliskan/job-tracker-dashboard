import React, { useState, useContext } from "react";
import { JobProvider, JobContext } from "./context/JobContext";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobFilter from "./components/JobFilter";
import Alert from "./components/ui/Alert";

function AppContent() {
  const { jobs, error, message, setError, setMessage } = useContext(JobContext);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? job.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
      {/* Dashboard Header */}
        <h1 className="text-2xl font-bold text-blue-700">Job Tracker Dashboard</h1>

      {/* Alert messages (error/success) */}
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      {message && <Alert type="success" message={message} onClose={() => setMessage(null)} />}

     {/* ✅ Job filter bar */}
     <JobFilter
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
     />

       {/* ✅ Form to add or update jobs */}
       <JobForm />

       {/* ✅ Filtered job list */}
       <JobList jobs={filteredJobs} />
     </div>
    </div>
  );
}

export default function App() {
  return (
    <JobProvider>
      <AppContent />
    </JobProvider>
  );
}
