import React, { useContext } from "react";
import { JobProvider, JobContext } from "./context/JobContext"; // 🔹 Context import
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";
import Dashboard from "./components/Dashboard";
import Alert from "./components/ui/Alert"; // 🔹 Reusable alert component

function AppContent() {
  const { jobs, error, message, setError, setMessage } = useContext(JobContext);

  return (
    <div className="max-w-3xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-4">Job Tracker Dashboard</h1>

    {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
    {message && <Alert type="success" message={message} onClose={() => setMessage(null)} />}

    <Dashboard jobs={jobs} />
    <AddJobForm />
    <JobList />
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
