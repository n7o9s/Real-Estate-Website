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

    useEffect(() => {
        axios.get(`http://localhost:3000/properties/${id}`)
            .then(response => {
                setProperty(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("ERROR!!! GETTING property details:", error);
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

            await axios.post("http://localhost:3000/inquiries",
                { propertyId: id, message },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Inquiry sent successfully!");
            setMessage("");
        } catch (error) {
            console.error("Error sending inquiry:", error.response?.data || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!property) return <p>Property not found</p>;

    return (
        <div className="property-details">
            <h1>{property.title}</h1>
            <img src={property.images[0]} alt={property.title} />
            <p className="price">${property.price}</p>
            <p>{property.location}</p>
            <p>{property.description}</p>
        </div>
    );
};

export default PropertyDetails;
