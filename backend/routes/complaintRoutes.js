const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.post("/", async (req, res) => {
    try {
        const newComplaint = new Complaint(req.body);
        const savedComplaint = await newComplaint.save();

        res.status(201).json({
            message: "Complaint created successfully",
            complaint: savedComplaint,
        });
    } catch (error) {
        console.error("Create Error:", error.message);
        res.status(500).json({ message: "Error creating complaint" });
    }
});

router.get("/", async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        console.error("Fetch Error:", error.message);
        res.status(500).json({ message: "Error fetching complaints" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deletedComplaint = await Complaint.findByIdAndDelete(req.params.id);

        if (!deletedComplaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        res.status(200).json({ message: "Complaint deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error.message);
        res.status(500).json({ message: "Error deleting complaint" });
    }
});

module.exports = router;