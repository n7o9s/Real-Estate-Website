import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password,
            });

            console.log("Login Response:", response.data);

            if (!response.data || !response.data.token || !response.data.role) {
                throw new Error("Invalid login response. Please try again.");
            }

            // store token & role
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userEmail", email);

            alert(`Login Successful! Welcome, ${response.data.role}.`);
            navigate("/"); // redirect to home 
        } catch (error) {
            console.error("Login Error:", error);
            setError(error.response?.data?.error || "Invalid email or password.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Sign in to continue</p>

                {error && <p className="error-text">{error}</p>}

                <form onSubmit={handleLogin} className="login-form">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="signup-text">Don't have an account?</p>
                <Link to="/signup" className="signup-btn">Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;
