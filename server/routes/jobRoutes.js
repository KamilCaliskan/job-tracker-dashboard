import express from "express";
import fs from "fs-extra";
import { authMiddleware } from "../auth.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();
const jobsFile = "./data/jobs.json";

// ------------------------------
// 🔹 ADMIN — Get ALL jobs
// ------------------------------
router.get("/all", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsFile);
        res.json(jobs); // Admin sees EVERYTHING
    } catch (err) {
        console.error("Admin read error:", err);
        res.status(500).json({ message: "Failed to load all jobs" });
    }
});

// ------------------------------
// 📌 PUBLIC ROUTE (No login required)
// ------------------------------
router.get("/", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsFile);
        // Filter by user if not admin
        if (req.user.role !== "admin") {
            const userJobs = jobs.filter(job => job.userId === req.user.id);
            return res.json(userJobs);
        }
        res.json(jobs);
    } catch (err) {
        console.error("Jobs fetch error:", err);
        res.status(500).json({ message: "Failed to load jobs" });
    }
});

// ➕ Create new job
router.post("/", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsFile);

        const newJob = {
            id: Date.now(),
            userId: req.user.id,
            ...req.body,
        };

        jobs.push(newJob);
        await fs.writeJSON(jobsFile, jobs);

        res.status(201).json(newJob);
    } catch (err) {
        console.error("Add job error:", err);
        res.status(500).json({ message: "Failed to add job" });
    }
});

// ✏️ Update job
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsFile);

        const updatedJobs = jobs.map(job =>
        job.id === Number(req.params.id) ? { ...job, ...req.body } : job
        );

        await fs.writeJSON(jobsFile, updatedJobs);
        res.json({ message: "Job updated successfully" });
    } catch (err) {
        console.error("Update job error:", err);
        res.status(500).json({ message: "Failed to update job" });
    }
});

// ❌ Delete job
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsFile);
        const newJobs = jobs.filter(job => job.id !== Number(req.params.id));

        await fs.writeJSON(jobsFile, newJobs);
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        console.error("Delete job error:", err);
        res.status(500).json({ message: "Failed to delete job" });
    }
});

export default router;
