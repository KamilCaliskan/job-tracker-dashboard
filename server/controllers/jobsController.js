import Job from "../models/Job.js";

/**
 * Get all jobs for the logged-in user
 */
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};

/**
 * Create new job
 */
export const createJob = async (req, res) => {
    try {
        const job = new Job({
            ...req.body,
            userId: req.user.id
        });

        const saved = await job.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: "Failed to create job" });
    }
};

/**
 * Update job (only if owner)
 */
export const updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!updatedJob) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        res.json(updatedJob);
    } catch (err) {
        res.status(500).json({ error: "Failed to update job" });
    }
};

/**
 * Delete job
 */
export const deleteJob = async (req, res) => {
    try {
        const deleted = await Job.deleteOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (deleted.deletedCount === 0) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        res.json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete job" });
    }
};
