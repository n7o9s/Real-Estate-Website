import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/PropertyDetails.css";

function PropertyDetails() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:3000/properties/${id}`)
            .then((response) => {
                setProperty(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching property details:", error);
                setLoading(false);
            });
    }, [id]);

    const handleInquiry = async () => {
        try {
            const token = localStorage.getItem("token");
            const buyerEmail = localStorage.getItem("userEmail");

            if (!token || !buyerEmail) {
                setError("Please log in to send an inquiry.");
                return;
            }

            if (!message.trim()) {
                setError("Message cannot be empty.");
                return;
            }

            const response = await axios.post(
                "http://localhost:3000/inquiries",
                {
                    propertyId: id,
                    buyerEmail,
                    message,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Inquiry sent successfully!");
            setMessage("");
            setError("");
        } catch (err) {
            console.error("❌ Error sending inquiry:", err);
            setError("Failed to send inquiry. Please try again.");
        }
    };

    if (loading) return <p>Loading property details...</p>;
    if (!property) return <p>Property not found.</p>;

    return (
        <div className="property-details">
            <h2>{property.title}</h2>
            <img src={property.images?.[0] || "default-image.jpg"} alt={property.title} />

            <div className="property-info">
                <p><strong>Price:</strong> ${property.price.toLocaleString()}</p>
                <p><strong>Location:</strong> {property.location}</p>
                <p><strong>Bedrooms:</strong> {property.bedrooms} | <strong>Bathrooms:</strong> {property.bathrooms}</p>
                <p><strong>Description:</strong> {property.description}</p>
            </div>

            {/* Inquiry Form */}
            <div className="inquiry-form">
                <h3>Contact Seller</h3>
                {success && <p className="success-text">{success}</p>}
                {error && <p className="error-text">{error}</p>}

                <textarea
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={handleInquiry} className="contact-btn">Send Inquiry</button>
            </div>
        </div>
    );
}

export default PropertyDetails;
