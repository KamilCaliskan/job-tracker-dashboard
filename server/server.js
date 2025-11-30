import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs-extra";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------
// FILE PATHS
// -----------------------------
const usersPath = "./data/users.json";
const jobsPath = "./data/jobs.json";

// Ensure JSON files exist
await fs.ensureFile(usersPath);
await fs.ensureFile(jobsPath);

if (!(await fs.readFile(usersPath, "utf8"))) {
    await fs.writeJSON(usersPath, []);
}

if (!(await fs.readFile(jobsPath, "utf8"))) {
    await fs.writeJSON(jobsPath, []);
}

// -----------------------------
// AUTH MIDDLEWARE
// -----------------------------
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// -----------------------------
// AUTH ROUTES
// -----------------------------

// LOGIN
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    const users = await fs.readJSON(usersPath);
    const user = users.find((u) => u.email === email);

    if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
});

// REGISTER (optional, admin only)
// You can enable this later.
// --------------------------------------------


// -----------------------------
// USER PROFILE (Step 17.5)
// -----------------------------
app.get("/api/auth/me", authMiddleware, (req, res) => {
    const { id, name, email, role } = req.user;

    res.json({ id, name, email, role });
});

// -----------------------------
// PUBLIC ROUTE — LIST ALL JOBS
// -----------------------------
app.get("/api/jobs", async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsPath);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: "Failed to load jobs" });
    }
});

// -----------------------------
// CREATE JOB (Protected)
// -----------------------------
app.post("/api/jobs", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsPath);

        const newJob = {
            id: Date.now(),
         userId: req.user.id, // owner of the job
         ...req.body,
        };

        jobs.push(newJob);
        await fs.writeJSON(jobsPath, jobs);

        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ message: "Failed to add job" });
    }
});

// -----------------------------
// UPDATE JOB (Protected)
// -----------------------------
app.put("/api/jobs/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsPath);

        // restrict editing to owner
        const updatedJobs = jobs.map((job) =>
        job.id === Number(req.params.id) &&
        job.userId === req.user.id
        ? { ...job, ...req.body }
        : job
        );

        await fs.writeJSON(jobsPath, updatedJobs);

        res.json({ message: "Job updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to update job" });
    }
});

// -----------------------------
// DELETE JOB (Protected)
// -----------------------------
app.delete("/api/jobs/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJSON(jobsPath);

        const newJobs = jobs.filter(
            (job) =>
            job.id !== Number(req.params.id) ||
            job.userId !== req.user.id
        );

        await fs.writeJSON(jobsPath, newJobs);

        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete job" });
    }
});

// -----------------------------
// START SERVER
// -----------------------------
app.listen(5000, () => console.log("✅ Backend running on port 5000"));
