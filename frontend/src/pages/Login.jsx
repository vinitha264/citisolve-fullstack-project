import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { authAPI } from "../services/API";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
            general: "",
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!loginData.email.trim()) newErrors.email = "Email is required";
        if (!loginData.password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);

        try {
            const response = await authAPI.login(loginData);

            if (!response.name || !response.email) {
                throw new Error("Invalid response from server");
            }

            login({
                name: response.name,
                email: response.email,
                role: response.role,
            });

          
            navigate("/my-complaint");
        } catch (error) {
            console.error("Login failed:", error);

        
            setErrors({
                general:
                    error.message ||
                    "Login failed. Please check your email and password and try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Login to our page</h2>

                <form onSubmit={handleSubmit} className="login-form">
                    {errors.general && <p className="error">{errors.general}</p>}

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                            className="form-input"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            placeholder="Enter your password"
                            onChange={handleChange}
                            className="form-input"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <div className="button-container">
                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </div>

                    <p className="register-text">
                        Don’t have an account?{" "}
                        <Link to="/register" className="register-link">
                            Register here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
