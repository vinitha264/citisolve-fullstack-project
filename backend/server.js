// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// ----------------------
// CORS setup
// ----------------------
const allowedOrigins = [
    "http://localhost:5173", // optional previous dev port
    "http://localhost:5174", // your current local frontend
    "https://your-frontend-deployed-url.com" // production frontend
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow non-browser requests (Postman/curl)
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // needed because frontend uses credentials: "include"
    })
);

app.use(express.json());

// ----------------------
// MongoDB connection
// ----------------------
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

// ----------------------
// Routes
// ----------------------
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const complaintRoutes = require("./routes/complaintRoutes");
app.use("/api/complaints", complaintRoutes);

// ----------------------
// Test route
// ----------------------
app.get("/", (req, res) => {
    res.send("🚀 CitiSolve Backend Server is Running...");
});

// ----------------------
// 404 handler
// ----------------------
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});

// ----------------------
// Error handler
// ----------------------
app.use((err, req, res, next) => {
    console.error("🔥 Server Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));