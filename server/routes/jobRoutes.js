import express from "express";
import Job from "../models/Job.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ✅ Get all jobs (auth required)
router.get("/", authMiddleware, async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
});

// ✅ Create new job (auth required)
router.post("/", authMiddleware, async (req, res) => {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
});

// ✅ Update job (auth required)
router.put("/:id", authMiddleware, async (req, res) => {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedJob);
});

// ✅ Delete job (auth + admin required)
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
});

export default router;
