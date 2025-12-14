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

// Initialize data files
async function initDataFiles() {
    await fs.ensureDir(dataDir);
    
    // Create jobs.json if missing
    if (!(await fs.pathExists(jobsPath))) {
        await fs.writeJson(jobsPath, []);
    }
    
    // Create users.json with plain text password
    if (!(await fs.pathExists(usersPath))) {
        const users = [{
            id: 1,
            email: "admin@example.com",
            password: "admin123",  // PLAIN TEXT
            role: "admin"
        }];
        await fs.writeJson(usersPath, users);
    }
}

// SIMPLE AUTH MIDDLEWARE
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (token === "Bearer admin-token") {
        req.user = { id: 1, email: "admin@example.com", role: "admin" };
        next();
    } else {
        res.status(401).json({ error: "Invalid token" });
    }
};

// --------------------------
// AUTH ROUTES
// --------------------------

// LOGIN (plain text comparison)
app.post("/api/auth/login", async (req, res) => {
    try {
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
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error: "Login failed" });
    }
});

// --------------------------
// JOB ROUTES (PROTECTED)
// --------------------------

// GET all jobs
app.get("/api/jobs", authMiddleware, async (req, res) => {
    try {
        const jobs = await fs.readJson(jobsPath);
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to load jobs" });
    }
});

// CREATE job
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

// UPDATE job
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

// DELETE job
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

// TEST endpoint
app.get("/api/test", (req, res) => {
    res.json({ message: "Server is working" });
});

// Initialize and start
initDataFiles().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
        console.log(`🔐 Login: admin@example.com / admin123`);
        console.log(`🔑 Token: admin-token`);
        console.log(`📊 API: http://localhost:${PORT}/api/jobs`);
    });
}).catch(err => {
    console.error("Failed to initialize:", err);
});
