import React from 'react';
import "./Home.css";
import { useAuth } from '../Context/AuthContext';
import { Link } from 'react-router-dom';


const Home = () => {
    const auth = useAuth();

    return (
        <div className="home-container">
            <div className="home-content">
                <h1>Citizen Resolution System</h1>
                <p>
                    Report and track community issues efficiently. Your voice matters in building a better community.
                </p>

                {auth.user && auth.user.name ? (
                    <div className="home-welcome">
                        <p>Welcome back, {auth.user.name} ({auth.user.role})</p>

                        <h2>Quick Actions</h2>
                        <div className="quick-actions">
                            <div className="quick-card">
                                <div className="empty-icon">📝</div>
                                <h3>Submit Complaint</h3>
                                <p>Report a new issue in your community.</p>
                                <Link to="/complaintform">Submit Now</Link>
                            </div>

                            <div className="quick-card">
                                <div className="empty-icon">📊</div>
                                <h3>My Complaints</h3>
                                <p>Track the status of your submitted complaints.</p>
                                <Link to="/my-complaint">View Complaints</Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="home-auth">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>

                        <div className="how-it-works">
                            <h1>How It Works</h1>
                            <div className="steps">
                                <div >
                                    <div className="step-circle">1</div>
                                    <h4>Register</h4>
                                    <p>Create your account as a citizen.</p>
                                </div>
                                <div >
                                    <div className="step-circle">2</div>
                                    <h4>Submit</h4>
                                    <p>Report issues with details and photos.</p>
                                </div>
                                <div>
                                    <div className="step-circle">3</div>
                                    <h4>Track</h4>
                                    <p>Monitor progress and status updates.</p>
                                </div>
                            </div>

                            <div className="cta">
                                <h2>Ready to Get Started?</h2>
                                <p>Join our community and help make a difference.</p>
                                <Link to="/register"><button>Create Account</button></Link>
                                <Link to="/login">Sign In</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;