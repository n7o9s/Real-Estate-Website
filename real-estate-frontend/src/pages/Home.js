import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ location: "", price: "", minPrice: "", bedrooms: "", type: "" });

    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleSearch = () => {
        const queryParams = new URLSearchParams(filter).toString();
        navigate(`/properties?${queryParams}`);
    };

    return (
        <div className="home-container">
            <div className="hero-section">
                <h1>🏡 Find Your Dream Home</h1>
                <p>Search through the best listings in your area.</p>

                {!token ? (
                    <div className="home-buttons">
                        <Link to="/login" className="home-btn login-btn">Login</Link>
                        <Link to="/signup" className="home-btn signup-btn">Sign Up</Link>
                    </div>
                ) : (
                    <div className="search-filters">
                        <input type="text" placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <input type="text" placeholder="Location" name="location" value={filter.location} onChange={(e) => setFilter({ ...filter, location: e.target.value })} />
                        <input type="number" placeholder="Min Price" name="minPrice" value={filter.minPrice} onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })} />
                        <input type="number" placeholder="Max Price" name="price" value={filter.price} onChange={(e) => setFilter({ ...filter, price: e.target.value })} />
                        <input type="number" placeholder="Bedrooms" name="bedrooms" value={filter.bedrooms} onChange={(e) => setFilter({ ...filter, bedrooms: e.target.value })} />
                        <select name="type" value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })}>
                            <option value="">All Types</option>
                            <option value="house">House</option>
                            <option value="apartment">Apartment</option>
                            <option value="room">Room</option>
                        </select>
                        <button className="search-btn" onClick={handleSearch}>Search</button>
                    </div>
                )}
            </div>

            {/* Creates a long scrolling effect */}
            <div className="scrolling-space"></div>
        </div>
    );
}

export default Home;
