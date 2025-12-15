import React, { useState, useEffect } from "react";
import JobForm from "./components/JobForm.jsx";
import JobList from "./components/JobList.jsx";
import JobFilter from "./components/JobFilter.jsx";
import Pagination from "./components/Pagination.jsx";
import Alert from "./components/ui/Alert.jsx";
import LoginForm from "./components/LoginForm.jsx";
import { getJobs, addJob, updateJob, deleteJob } from "./api/jobsApi.js";
import axios from "axios";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({ title: "", company: "", status: "Pending" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  useEffect(() => {
    if (token) {
      fetchJobs();
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data || []);
    } catch (err) {
      setError("Failed to load jobs.");
      if (err.response?.status === 401) {
        setToken(""); // Token expired
      }
    }
  };

  const handleLogin = async (email, password) => {
    console.log("✅ App.js: handleLogin CALLED with:", { email, password });

    // SECURITY CHECK: Make sure we're not getting token instead of email
    if (email === "admin-token" || email.includes("token")) {
      console.error("❌ CRITICAL BUG: LoginForm is passing TOKEN as email!");
      console.error("   Email parameter =", email);
      console.error("   This means LoginForm.jsx has: onLogin(token) instead of onLogin(email, password)");
      setError("BUG: LoginForm configured wrong. Check console.");
      return;
    }

    if (!email || !password) {
      console.error("❌ Email or password missing!");
      setError("Email and password required");
      return;
    }

    try {
      console.log("🔄 Calling API with:", { email: email.substring(0, 10) + "..." });

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      console.log("✅ API Response:", response.data);

      setToken(response.data.token);
      setUser(response.data.user);
      setMessage("Login successful!");
      setError(null);

    } catch (err) {
      console.error("❌ API Error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message
      });
      setError("Login failed. Check console for details.");
    }
  };

  const handleLogout = () => {
    setToken("");
    setUser(null);
    setJobs([]);
    setMessage("Logged out successfully.");
  };

  const handleAddOrUpdate = async (payload) => {
    try {
      if (payload.id) {
        await updateJob(payload.id, payload);
        setMessage("Job updated.");
      } else {
        await addJob(payload);
        setMessage("Job added.");
      }
      fetchJobs();
      setJob({ title: "", company: "", status: "Pending" });
    } catch (err) {
      console.error("Save error:", err);
      setError("Save failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      setMessage("Job deleted.");
      fetchJobs();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Delete failed.");
    }
  };

  // filtering
  const filtered = jobs.filter((j) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q ||
    (j.title && j.title.toLowerCase().includes(q)) ||
    (j.company && j.company.toLowerCase().includes(q));
    const matchesStatus = !statusFilter || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // pagination
  const totalJobs = filtered.length;
  const indexLast = currentPage * jobsPerPage;
  const indexFirst = indexLast - jobsPerPage;
  const currentJobs = filtered.slice(indexFirst, indexLast);

  // If not logged in, show login page
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-blue-700 text-center">Job Tracker Login</h1>
      <LoginForm onLogin={handleLogin} />
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      {message && <Alert type="success" message={message} onClose={() => setMessage(null)} />}

      <div className="mt-4 text-sm text-gray-500 text-center">
      <p className="font-semibold">Test Credentials:</p>
      <p className="font-mono">Email: admin@example.com</p>
      <p className="font-mono">Password: admin123</p>
      <p className="mt-2 text-xs">Check browser console (F12) for debug info</p>
      </div>
      </div>
      </div>
    );
  }

  // Dashboard (logged in)
  return (
    <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
    <header className="mb-6 flex justify-between items-center">
    <div>
    <h1 className="text-2xl font-semibold text-slate-800">Job Tracker Dashboard</h1>
    <p className="text-sm text-gray-500 mt-1">
    Welcome, {user?.email || "User"} • {filtered.length} jobs • Token: {token.substring(0, 15)}...
    </p>
    </div>
    <button
    onClick={handleLogout}
    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
    >
    Logout
    </button>
    </header>

    {/* Alerts */}
    <div className="mb-4">
    {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
    {message && <Alert type="success" message={message} onClose={() => setMessage(null)} />}
    </div>

    {/* Form & Filters */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
    <div className="lg:col-span-1">
    <JobForm job={job} setJob={setJob} onSubmit={handleAddOrUpdate} />
    </div>

    <div className="lg:col-span-2">
    <JobFilter
    search={search}
    setSearch={setSearch}
    statusFilter={statusFilter}
    setStatusFilter={setStatusFilter}
    />
    <div className="mb-4 text-sm text-gray-600">
    Showing <span className="font-medium">{currentJobs.length}</span> of {filtered.length} jobs
    </div>

    <JobList jobs={currentJobs} onEdit={(j) => setJob(j)} onDelete={handleDelete} />

    {totalJobs > jobsPerPage && (
      <Pagination
      totalJobs={totalJobs}
      jobsPerPage={jobsPerPage}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      />
    )}
    </div>
    </div>
    </div>
    </div>
  );
}
