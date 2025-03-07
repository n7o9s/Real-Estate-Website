import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); // get user role

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userEmail");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="nav-logo">
                    <span className="key">Key</span><span className="nest">Nest</span>
                </Link>
                <Link to="/properties" className="nav-link">Properties</Link>
            </div>

            <div className="nav-right">
                {token ? (
                    <>
                        {userRole === "seller" && (
                            <Link to="/list-property" className="nav-link btn">List Property</Link>
                        )}
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link btn">Login</Link>
                        <Link to="/signup" className="nav-link btn">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
