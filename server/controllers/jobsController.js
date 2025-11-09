import fs from "fs-extra";
import path from "path";

const filePath = path.resolve("models/jobs.json");

export const getJobs = async (req, res) => {
    try {
        const data = await fs.readJson(filePath);
        res.json(data);
    } catch {
        res.status(500).json({ error: "Failed to read data" });
    }
};

export const addJob = async (req, res) => {
    try {
        const jobs = await fs.readJson(filePath);
        const newJob = { id: Date.now(), ...req.body };
        jobs.push(newJob);
        await fs.writeJson(filePath, jobs);
        res.status(201).json(newJob);
    } catch {
        res.status(500).json({ error: "Failed to add job" });
    }
};

export const updateJob = async (req, res) => {
    try {
        const jobs = await fs.readJson(filePath);
        const idx = jobs.findIndex((j) => j.id === parseInt(req.params.id));
        if (idx === -1) return res.status(404).json({ error: "Not found" });
        jobs[idx] = { ...jobs[idx], ...req.body };
        await fs.writeJson(filePath, jobs);
        res.json(jobs[idx]);
    } catch {
        res.status(500).json({ error: "Failed to update job" });
    }
};

export const deleteJob = async (req, res) => {
    try {
        let jobs = await fs.readJson(filePath);
        jobs = jobs.filter((j) => j.id !== parseInt(req.params.id));
        await fs.writeJson(filePath, jobs);
        res.json({ success: true });
    } catch {
        res.status(500).json({ error: "Failed to delete job" });
    }
};
