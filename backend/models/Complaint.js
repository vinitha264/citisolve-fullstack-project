const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        ward: {
            type: String,
            required: true,
            trim: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Water Issue",
                "Electricity Issue",
                "Garbage Issue",
                "Road Damage",
                "Street Light Problem",
                "Other",
            ],
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        photo: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Resolved"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);