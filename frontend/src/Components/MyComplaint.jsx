import React, { useEffect, useState } from "react";
import "./MyComplaint.css";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../services/API";

const MyComplaint = () => {
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        fetch(`${BASE_URL}/api/complaints`)
            .then((res) => res.json())
            .then((data) => setComplaints(data))
            .catch((err) => console.log("Error fetching complaints:", err));
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this complaint?"
        );
        if (!confirmDelete) return;

        try {
            await fetch(
                `${BASE_URL}/api/complaints/delete/${id}`,
                {
                    method: "DELETE",
                }
            );

            setComplaints((prev) =>
                prev.filter((item) => item._id !== id)
            );
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    const filteredComplaints =
        statusFilter === "All"
            ? complaints
            : complaints.filter(
                (c) => c.status === statusFilter
            );

    if (complaints.length === 0) {
        return (
            <div className="empty-wrapper">
                <div className="empty-card">
                    <div className="empty-icon">📝</div>
                    <h1>No Complaints Yet</h1>
                    <p>You haven't submitted any complaints yet.</p>
                    <button
                        className="primary-btn"
                        onClick={() => navigate("/complaintform")}
                    >
                        Submit Your First Complaint
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-bg">
            <h1 className="page-title">My Complaints</h1>
            <p className="page-subtitle">
                Track the status of your submitted complaints
            </p>

            <div className="top-controls">
                <div className="filter-controls">
                    <label>Filter by status:</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </div>

                <button
                    className="primary-btn"
                    onClick={() => navigate("/complaintform")}
                >
                    Submit New Complaint
                </button>
            </div>

            <div className="complaint-list">
                {filteredComplaints.map((c) => (
                    <div className="complaint-card" key={c._id}>
                        <div className="card-header">
                            <span className="complaint-id">
                                ID: {c._id.slice(-6).toUpperCase()}
                            </span>
                            <span
                                className={`status ${c.status
                                    .toLowerCase()
                                    .replace(" ", "-")}`}
                            >
                                {c.status}
                            </span>
                        </div>

                        <h3 className="complaint-name">{c.name}</h3>

                        <div className="row">
                            <span>Ward:</span>
                            <span>{c.ward}</span>
                        </div>

                        <div className="row">
                            <span>Location:</span>
                            <span>{c.location}</span>
                        </div>

                        <div className="row">
                            <span>Category:</span>
                            <span className="category-badge">
                                {c.category}
                            </span>
                        </div>

                        <div className="row">
                            <span>Submitted:</span>
                            <span>
                                {new Date(c.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <p className="description">
                            {c.description}
                        </p>

                        {/* 🔴 Delete Button */}
                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(c._id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyComplaint;
