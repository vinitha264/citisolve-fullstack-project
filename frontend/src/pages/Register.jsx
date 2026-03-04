import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { authAPI } from "../services/API";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "citizen",
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));

        setGeneralError("");
    };

    const validateForm = () => {
        const newErrors = {};

        if (formData.name.trim() === "") {
            newErrors.name = "Full name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters long";
        }

        if (formData.email.trim() === "") {
            newErrors.email = "Email is required";
        }

        if (formData.password.trim() === "") {
            newErrors.password = "Password is required";
        } else if (formData.password.trim().length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setGeneralError("");

        try {
            const response = await authAPI.register(formData);
            console.log("Registration successful:", response);

            login({
                name: formData.name,
                email: formData.email,
                role: formData.role,
            });

            navigate("/");

        } catch (error) {
            console.error("Registration failed:", error.message);
            setGeneralError(error.message || "User already exists");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create Account</h2>
                <p className="register-subtitle">
                    Join our citizen resolution system
                </p>

                <form className="register-form" onSubmit={handleSubmit}>
                    {generalError && (
                        <div className="form-alert error">{generalError}</div>
                    )}
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            placeholder="Enter your name"
                            onChange={handleChange}
                        />
                        {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="citizen">Citizen</option>
                            <option value="admin">Admin</option>
                        </select>
                        <p className="role-note">
                            Citizen role can submit and view their own complaints
                        </p>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name="password"
                            type="password"
                            value={formData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                        />
                        {errors.password && (
                            <span className="field-error">{errors.password}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            placeholder="Confirm your password"
                            onChange={handleChange}
                        />
                        {errors.confirmPassword && (
                            <span className="field-error">
                                {errors.confirmPassword}
                            </span>
                        )}
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

                <div className="login-link">
                    <p>Already have an account?</p>
                    <Link to="/login">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;