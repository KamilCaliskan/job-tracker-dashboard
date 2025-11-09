import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import jobRoutes from "./routes/jobs.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
