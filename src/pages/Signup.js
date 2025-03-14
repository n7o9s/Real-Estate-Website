import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("buyer"); // Default role: buyer when user is signing up 
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup", {
                name,
                email,
                password,
                role,
            });

            alert(`Account Created Successfully as a ${role}!`);
            navigate("/login"); // redirects to Login Page
        } catch (error) {
            setError(error.response?.data?.error || "An unexpected error occurred.");
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2 className="signup-title">Create an Account 🚀</h2>
                <p className="signup-subtitle">Join us and start exploring properties</p>

                {error && <p className="error-text">{error}</p>}

                <form onSubmit={handleSignup} className="signup-form">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* Role Selection */}
                    <div className="role-selection">
                        <label>
                            <input
                                type="radio"
                                value="buyer"
                                checked={role === "buyer"}
                                onChange={() => setRole("buyer")}
                            />
                            Buyer
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="seller"
                                checked={role === "seller"}
                                onChange={() => setRole("seller")}
                            />
                            Seller
                        </label>
                    </div>

                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>

                <p className="login-text">Already have an account?</p>
                <Link to="/login" className="login-btn">Login</Link>
            </div>
        </div>
    );
}

export default Signup;
