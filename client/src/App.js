import React, { useContext } from "react";
import { JobProvider, JobContext } from "./context/JobContext";
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";
import Dashboard from "./components/Dashboard";
import Alert from "./components/ui/Alert";

function AppContent() {
  const { jobs, error, message, setError, setMessage } = useContext(JobContext);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-blue-700">Job Tracker Dashboard</h1>
       <Alert message={alert.message} type={alert.type} />
       <JobForm job={job} setJob={setJob} onSubmit={handleAddOrUpdate} />
       <JobList jobs={jobs} onEdit={setJob} onDelete={handleDeleteJob} />
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
