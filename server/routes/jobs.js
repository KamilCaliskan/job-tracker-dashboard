const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// Create job
router.post("/", async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update job
router.put("/:id", async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedJob);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete job
router.delete("/:id", async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
