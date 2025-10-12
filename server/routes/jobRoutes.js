import express from "express";
import Job from "../models/Job.js";
const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
});

// Create new job
router.post("/", async (req, res) => {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
});

// Update job
router.put("/:id", async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedJob);
});

// Delete job
router.delete("/:id", async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
});

export default router;
