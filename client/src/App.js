import React, { useState, useEffect } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import JobFilter from "./components/JobFilter";
import Alert from "./components/ui/Alert";
import LoginForm from "./components/LoginForm";

// API layer
import {
  getJobs,
  addJob,
  updateJob,
  deleteJob,
} from "./api/jobsApi";

function App() {
  // AUTH STATE

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // Save token to localStorage
  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);


    // JOB DATA
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // ALERTS
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    // FETCH JOBS (ONLY IF LOGGED IN)

    useEffect(() => {
      if (token) fetchJobs();
    }, [token]);

      const fetchJobs = async () => {
        try {
          const res = await getJobs(token);
          setJobs(res.data);
        } catch (err) {
          setError("Failed to load jobs.");
        }
      };


      // ADD OR UPDATE JOB
      const handleAddOrUpdate = async (job) => {
        try {
          if (job.id) {
            await updateJob(job.id, job, token);
            setMessage("Job updated!");
          } else {
            await addJob(job, token);
            setMessage("Job added!");
          }
          fetchJobs();
        } catch (err) {
          setError("Error saving job.");
        }
      };

      // --------------------------
      // DELETE JOB
      // --------------------------
      const handleDelete = async (id) => {
        try {
          await deleteJob(id, token);
          setMessage("Job deleted!");
          fetchJobs();
        } catch (err) {
          setError("Delete failed.");
        }
      };

      // --------------------------
      // FILTER LOGIC
      // --------------------------
      const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter ? job.status === statusFilter : true;

        return matchesSearch && matchesStatus;
      });

      // --------------------------
      // IF USER IS NOT LOGGED IN: SHOW LOGIN PAGE
      // --------------------------
      if (!token) {
        return (
          <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
          <h1 className="text-xl font-bold mb-4 text-blue-700">Login</h1>
          <LoginForm setToken={setToken} />
          </div>
          </div>
        );
      }

      // --------------------------
      // MAIN DASHBOARD
      // --------------------------
      return (
        <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">Job Tracker Dashboard</h1>

        <button
        onClick={() => setToken("")}
        className="bg-red-500 text-white px-3 py-1 rounded-lg"
        >
        Logout
        </button>
        </div>

        {/* ALERTS */}
        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
        {message && (
          <Alert type="success" message={message} onClose={() => setMessage(null)} />
        )}

        {/* FILTERS */}
        <JobFilter
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        />

        {/* FORM */}
        <JobForm onSubmit={handleAddOrUpdate} />

        {/* LIST */}
        <JobList jobs={filteredJobs} onDelete={handleDelete} />
        </div>
        </div>
      );
}

export default App;
