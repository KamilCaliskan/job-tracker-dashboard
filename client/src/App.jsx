import { useEffect, useState } from "react";
import { getJobs, addJob, deleteJob } from "./services/jobService";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs().then(setJobs);
    }, []);

    const handleAdd = async (job) => {
        const newJob = await addJob(job);
        setJobs([newJob, ...jobs]);
    };

    const handleDelete = async (id) => {
        await deleteJob(id);
        setJobs(jobs.filter((j) => j._id !== id));
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Job Tracker</h1>
        <JobForm onAdd={handleAdd} />
        <JobList jobs={jobs} onDelete={handleDelete} />
        </div>
    );
}

export default App;
