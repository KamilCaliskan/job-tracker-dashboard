import React, { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobFilter from "./components/JobFilter";
import Alert from "./components/ui/Alert";

// API layer
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from "./api/jobsApi";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // alert messages
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // fetch jobs from backend API
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data);
    } catch (err) {
      setError("Failed to load jobs from server.");
    }
  };

  const handleAddOrUpdate = async (job) => {
    try {
      if (job.id) {
        await updateJob(job.id, job);
        setMessage("Job updated!");
      } else {
        await addJob(job);
        setMessage("Job added!");
      }
      fetchJobs();
    } catch (err) {
      setError("Error saving job.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setMessage("Job deleted!");
      fetchJobs();
    } catch (err) {
      setError("Delete failed.");
    }
  };

  // filtering logic
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
    <h1 className="text-2xl font-bold text-blue-700">Job Tracker Dashboard</h1>

    {/* Alerts */}
    {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
    {message && (
      <Alert type="success" message={message} onClose={() => setMessage(null)} />
    )}

    {/* Filters */}
    <JobFilter
    search={search}
    setSearch={setSearch}
    statusFilter={statusFilter}
    setStatusFilter={setStatusFilter}
    />

    {/* Form */}
    <JobForm onSubmit={handleAddOrUpdate} />

    {/* List */}
    <JobList jobs={filteredJobs} onDelete={handleDelete} />
    </div>
    </div>
  );
}

export default App;
