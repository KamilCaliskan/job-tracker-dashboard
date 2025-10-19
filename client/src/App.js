import React, { useState, useEffect } from "react";
import JobList from "./components/JobList";
import JobForm from "./components/JobForm";
import Dashboard from "./components/Dashboard";
import { getJobs, createJobAPI, updateJobAPI, deleteJobFromAPI } from "./services/jobService";

function App() {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState({ title: "", company: "", status: "applied" });

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobs();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-4">
    <Dashboard jobs={jobs} />
    <JobForm jobs={jobs} setJobs={setJobs} job={job} setJob={setJob} createJobAPI={createJobAPI} updateJobAPI={updateJobAPI} />
    <JobList jobs={jobs} setJobs={setJobs} deleteJobFromAPI={deleteJobFromAPI} setJob={setJob} />
    </div>
  );
}

export default App;
