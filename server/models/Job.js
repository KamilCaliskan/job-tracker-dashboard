import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        status: {
            type: String,
            enum: ["applied", "interview", "offer", "rejected"],
            default: "applied",
        },
        notes: String,
        dateApplied: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
