import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const Logout = () => {
        auth.logout();
        navigate("/", { replace: true });
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    <Link to="/" className="logo">
                        <h1>🏛️ CitiSolve</h1>
                    </Link>
                </div>

                {auth.user && auth.user.name ? (
                    <>
                        <div className="navbar-center">
                            <Link to="/complaintform">Submit Complaint</Link>
                            <Link to="/my-complaint">My Complaints</Link>
                        </div>
                        <div className="navbar-right">
                            <p>Welcome, {auth.user.name}</p>
                            <button onClick={Logout}>Logout</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="navbar-center"></div>
                        <div className="navbar-right">
                            <Link to="/login" className="nav-btn">Login</Link>
                            <Link to="/register" className="nav-btn">Register</Link>
                        </div>
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar;