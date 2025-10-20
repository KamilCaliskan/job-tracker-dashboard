const Job = require("../models/Job");

// ✅ Create new job with validation
exports.createJob = async (req, res, next) => {
    try {
        const { title, company, status } = req.body;
        if (!title || !company) {
            const err = new Error("Title and company are required.");
            err.status = 400;
            throw err;
        }

        const job = await Job.create({ title, company, status });
        res.status(201).json(job);
    } catch (error) {
        next(error);
    }
};

// ✅ Get all jobs
exports.getJobs = async (req, res, next) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        next(error);
    }
};

// ✅ Update job with validation
exports.updateJob = async (req, res, next) => {
    try {
        const { title, company, status } = req.body;
        if (!title || !company) {
            const err = new Error("Title and company are required.");
            err.status = 400;
            throw err;
        }

        const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!job) {
            const err = new Error("Job not found.");
            err.status = 404;
            throw err;
        }

        res.json(job);
    } catch (error) {
        next(error);
    }
};

// ✅ Delete job
exports.deleteJob = async (req, res, next) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            const err = new Error("Job not found.");
            err.status = 404;
            throw err;
        }
        res.json({ message: "Job deleted successfully." });
    } catch (error) {
        next(error);
    }
};
