import React, { useState } from "react";
import "./ComplaintForm.css";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        ward: "",
        location: "",
        category: "",
        description: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function validateForm() {
        const newError = {};

        if (!formData.name.trim()) newError.name = "Name is required";
        if (!formData.ward.trim()) newError.ward = "Ward is required";
        if (!formData.location.trim()) newError.location = "Location is required";
        if (!formData.category.trim()) newError.category = "Category is required";

        if (!formData.description.trim()) {
            newError.description = "Description is required";
        } else if (formData.description.length < 10) {
            newError.description = "Minimum 10 characters required";
        }

        setErrors(newError);
        return Object.keys(newError).length === 0;
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const response = await fetch("http://localhost:5000/api/complaints", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit complaint");
            }

            alert("Complaint Submitted Successfully!");
            navigate("/my-complaint");
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong!");
        }
    }

    return (
        <div className="complaint-form-container">
            <form onSubmit={handleSubmit}>
                <h1>Submit a Complaint</h1>

                <label>Your Name:</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <label>Ward:</label>
                <input
                    type="text"
                    name="ward"
                    placeholder="Enter your ward"
                    value={formData.ward}
                    onChange={handleChange}
                />
                {errors.ward && <p className="error">{errors.ward}</p>}

                <label>Location:</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={handleChange}
                />
                {errors.location && <p className="error">{errors.location}</p>}

                <label>Category:</label>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select a category</option>
                    <option value="Road Damage">Road Damage</option>
                    <option value="Garbage Issue">Garbage Issue</option>
                    <option value="Water Issue">Water Issue</option>
                    <option value="Street Light Problem">Street Light Problem</option>
                    <option value="Other">Other</option>
                </select>
                {errors.category && <p className="error">{errors.category}</p>}

                <label>Description:</label>
                <textarea
                    name="description"
                    placeholder="Enter complaint description"
                    value={formData.description}
                    onChange={handleChange}
                ></textarea>
                {errors.description && <p className="error">{errors.description}</p>}

                <div className="button-group">
                    <button
                        type="button"
                        onClick={() => navigate("/my-complaint")}
                    >
                        Cancel
                    </button>
                    <button type="submit">Submit Complaint</button>
                </div>
            </form>
        </div>
    );
};

export default ComplaintForm;