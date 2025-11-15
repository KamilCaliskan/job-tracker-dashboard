import express from "express";
import fs from "fs-extra";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const filePath = "./data/jobs.json";

// Get all jobs
app.get("/api/jobs", async (req, res) => {
    const jobs = await fs.readJSON(filePath);
    res.json(jobs);
});

// Add new job
app.post("/api/jobs", async (req, res) => {
    const jobs = await fs.readJSON(filePath);
    const newJob = { id: Date.now(), ...req.body };
    jobs.push(newJob);
    await fs.writeJSON(filePath, jobs);
    res.status(201).json(newJob);
});

// Update job
app.put("/api/jobs/:id", async (req, res) => {
    const jobs = await fs.readJSON(filePath);
    const updatedJobs = jobs.map((j) =>
    j.id === Number(req.params.id) ? { ...j, ...req.body } : j
    );
    await fs.writeJSON(filePath, updatedJobs);
    res.json({ message: "Updated successfully" });
});

// Delete job
app.delete("/api/jobs/:id", async (req, res) => {
    const jobs = await fs.readJSON(filePath);
    const filtered = jobs.filter((j) => j.id !== Number(req.params.id));
    await fs.writeJSON(filePath, filtered);
    res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => console.log("✅ Backend running on port 5000"));
