import { useEffect, useState } from "react";
import { getJobs, addJob, deleteJob, updateJob } from "./services/jobService";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs().then(setJobs);
    }, []);

    const handleAdd = async (job) => {
        try {
            const newJob = await addJob(job);
            setJobs(prev => [newJob, ...prev]);
        } catch (err) {
            console.error("Failed to add job:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteJob(id);
            setJobs(prev => prev.filter(job => job._id !== id));
        } catch (err) {
            console.error("Failed to delete job:", err);
        }
    };

    const handleEdit = (id, updatedJob) => {
        setJobs(prev => prev.map(job => (job._id === id ? updatedJob : job)));
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Job Tracker</h1>
        <JobForm onAdd={handleAdd} />
        <JobList jobs={jobs} onDelete={handleDelete} onEdit={handleEdit} />
        </div>
    );
}

export default App;
