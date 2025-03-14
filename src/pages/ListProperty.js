import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ListProperty.css";

function ListProperty() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
            setError("⚠️ Please log in to list a property.");
            return;
        }

        if (role !== "seller") {
            setError("⚠️ Only sellers can list properties.");
            return;
        }

        // ✅ Ensure all fields are included in the request
        const propertyData = {
            title,
            price: Number(price), // ✅ Convert to number
            location,
            bedrooms: Number(bedrooms), // ✅ Convert to number
            bathrooms: Number(bathrooms), // ✅ Convert to number
            description,
            type
        };

        console.log("📤 Sending Property Data:", propertyData); // ✅ Debugging

        try {
            const response = await axios.post("http://localhost:3000/api/properties/list", propertyData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json" // ✅ Ensuring correct content type
                }
            });

            alert(response.data.message);
            navigate("/properties");
        } catch (err) {
            console.error("❌ Error listing property:", err);
            setError(err.response?.data?.error || "Failed to list property. Please try again.");
        }
    };

    return (
        <div className="list-property-container">
            <div className="list-property-box">
                <h2 className="list-property-title">🏡 List Your Property</h2>
                <p className="list-property-subtitle">Fill in the details below to list your property.</p>

                {error && <p className="error-text">{error}</p>}

                <form onSubmit={handleSubmit} className="list-property-form">
                    <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
                    <input type="number" placeholder="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required />
                    <input type="number" placeholder="Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select Property Type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="room">Room</option>
                    </select>

                    {/* ❌ Image Upload Disabled */}
                    <p className="feature-coming-soon">🚀 Image Upload Feature Coming Soon!</p>

                    <button type="submit" className="list-btn">List Property</button>
                </form>
            </div>
        </div>
    );
}

export default ListProperty;
