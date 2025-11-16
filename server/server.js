import express from "express";
import fs from "fs-extra";
import cors from "cors";
import dotenv from "dotenv";
import { authMiddleware } from "./auth.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const filePath = "./data/jobs.json";

// ------------------------------
// 📌 PUBLIC ROUTE (No login required)
// ------------------------------
app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await fs.readJSON(filePath);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Failed to load jobs" });
    }
});

// ------------------------------
// 🔒 PROTECTED ROUTES (Login required)
// ------------------------------

// ➕ Create new job (Protected)
app.post("/api/jobs", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(filePath);

        const newJob = {
            id: Date.now(),
         ...req.body,
        };

        jobs.push(newJob);
        await fs.writeJSON(filePath, jobs);

        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ message: "Failed to add job" });
    }
});

// ✏️ Update job (Protected)
app.put("/api/jobs/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(filePath);

        const updatedJobs = jobs.map((job) =>
        job.id === Number(req.params.id) ? { ...job, ...req.body } : job
        );

        await fs.writeJSON(filePath, updatedJobs);
        res.json({ message: "Job updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update job" });
    }
});

// ❌ Delete job (Protected)
app.delete("/api/jobs/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(filePath);
        const newJobs = jobs.filter((job) => job.id !== Number(req.params.id));

        await fs.writeJSON(filePath, newJobs);
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete job" });
    }
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
