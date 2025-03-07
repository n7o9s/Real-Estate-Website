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
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
            setError("Please log in to list a property.");
            return;
        }

        if (role !== "seller") {
            setError("Only sellers can list properties.");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("location", location);
        formData.append("bedrooms", bedrooms);
        formData.append("bathrooms", bathrooms);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const response = await axios.post("http://localhost:3000/api/properties/list", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            alert(response.data.message);
            navigate("/properties");
        } catch (err) {
            console.error("Error listing property:", err);
            setError("Failed to list property. Please try again.");
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

                    <label className="file-upload-label">
                        Upload Image
                        <input type="file" onChange={handleImageUpload} accept="image/*" required />
                    </label>

                    <button type="submit" className="list-btn">List Property</button>
                </form>
            </div>
        </div>
    );
}

export default ListProperty;
