import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 MeetUs Backend Running Successfully!");
});

// Routes
// import your routes and use like below:
// import userRoutes from "./routes/users.js";
// app.use("/api/users", userRoutes);

// Start server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
