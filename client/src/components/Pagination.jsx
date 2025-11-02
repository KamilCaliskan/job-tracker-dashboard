import Pagination from "./components/Pagination";

function App() {
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState({ title: "", company: "", status: "Pending" });
    const [alert, setAlert] = useState({ message: "", type: "" });
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter ? job.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    // pagination calculations
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handlePageChange = (page) => setCurrentPage(page);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
           <div className="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6">
             <h1 className="text-2xl font-bold text-blue-700">Job Tracker Dashboard</h1>
            <Alert message={alert.message} type={alert.type} />
            <JobForm job={job} setJob={setJob} onSubmit={handleAddOrUpdate} />
            <JobFilter
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            />
           <JobList jobs={currentJobs} onEdit={setJob} onDelete={handleDeleteJob} />
          <Pagination
          totalJobs={filteredJobs.length}
          jobsPerPage={jobsPerPage}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          />
         </div>
        </div>
    );
}
