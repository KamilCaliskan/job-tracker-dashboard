const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = path.join(__dirname, "data");
const jobsPath = path.join(dataDir, "jobs.json");
const usersPath = path.join(dataDir, "users.json");

// Initialize data
async function initDataFiles() {
    await fs.ensureDir(dataDir);
    if (!(await fs.pathExists(jobsPath))) {
        await fs.writeJson(jobsPath, []);
    }
    if (!(await fs.pathExists(usersPath))) {
        await fs.writeJson(usersPath, [
            {
                id: 1,
                email: "admin@example.com",
                password: "admin123",
                role: "admin"
            }
        ]);
    }
}

// SIMPLE AUTH - NO JWT
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (token === "Bearer admin-token") {
        req.user = { id: 1, email: "admin@example.com", role: "admin" };
        next();
    } else {
        res.status(401).json({ error: "Invalid token" });
    }
};

// Login
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const users = await fs.readJson(usersPath);
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({ 
            token: "admin-token",
            user: { id: user.id, email: user.email, role: user.role }
        });
    } else {
        res.status(401).json({ error: "Invalid credentials" });
    }
});

// Job routes
app.get("/api/jobs", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJson(jobsPath);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to load jobs" });
    }
});

app.post("/api/jobs", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJson(jobsPath);
        const newJob = {
            id: Date.now(),
            title: req.body.title || "",
            company: req.body.company || "",
            status: req.body.status || "Pending",
            createdAt: new Date().toISOString()
        };
        jobs.push(newJob);
        await fs.writeJson(jobsPath, jobs);
        res.status(201).json(newJob);
    } catch (err) {
        res.status(500).json({ error: "Failed to create job" });
    }
});

app.put("/api/jobs/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJson(jobsPath);
        const jobId = parseInt(req.params.id);
        const index = jobs.findIndex(j => j.id === jobId);
        
        if (index === -1) {
            return res.status(404).json({ error: "Job not found" });
        }
        
        jobs[index] = { ...jobs[index], ...req.body };
        await fs.writeJson(jobsPath, jobs);
        res.json(jobs[index]);
    } catch (err) {
        res.status(500).json({ error: "Failed to update job" });
    }
});

app.delete("/api/jobs/:id", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJson(jobsPath);
        const jobId = parseInt(req.params.id);
        const filteredJobs = jobs.filter(j => j.id !== jobId);
        
        if (filteredJobs.length === jobs.length) {
            return res.status(404).json({ error: "Job not found" });
        }
        
        await fs.writeJson(jobsPath, filteredJobs);
        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete job" });
    }
});

// Test
app.get("/api/test", (req, res) => {
    res.json({ message: "Server is working" });
});

// Start
initDataFiles().then(() => {
    const PORT = 5000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`🔐 Login: admin@example.com / admin123`);
        console.log(`🔑 Fixed token: admin-token`);
    });
});
