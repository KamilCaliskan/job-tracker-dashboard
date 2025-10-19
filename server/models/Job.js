const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, enum: ['applied','interview','rejected'], default: 'applied' }
}, { timestamps: true });

module.exports = mongoose.model("Job", JobSchema);
