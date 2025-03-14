import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/PropertyDetails.css";

const PropertyDetails = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/properties/${id}`) // Correct API route
            .then(response => {
                setProperty(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("ERROR fetching property details:", error);
                setError("Failed to load property details.");
                setLoading(false);
            });
    }, [id]);


    const handleInquirySubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("You must be logged in to send an inquiry.");
                return;
            }

            await axios.post("http://localhost:3000/api/inquiries",
                { propertyId: id, message },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Inquiry sent successfully!");
            setMessage("");
        } catch (error) {
            console.error("Error sending inquiry:", error.response?.data || error.message);
            setError("Failed to send inquiry.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!property) return <p>Property not found</p>;

    return (
        <div className="property-details">
            <h1>{property.title}</h1>
            {property.images?.length > 0 ? (
                <img src={property.images[0]} alt={property.title} />
            ) : (
                <p>No Image Available</p>
            )}
            <p className="price">${property.price}</p>
            <p>{property.location}</p>
            <p>{property.description}</p>

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
                <button onClick={handleInquirySubmit} className="contact-btn">Send Inquiry</button>
            </div>
        </div>
    );
};

export default PropertyDetails;
