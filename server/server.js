import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config.js";
import jobRoutes from "./routes/jobRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Job Tracker API is running...");
});

// API routes
app.use("/api/jobs", jobRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
