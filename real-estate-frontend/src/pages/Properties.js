import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Properties.css";

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/properties")
            .then(response => {
                setProperties(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching properties:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading properties...</p>;

    return (
        <div className="property-list">
            <h2 className="section-title">🏡 Listed Properties</h2>
            <div className="property-grid">
                {properties.map((property) => (
                    <div key={property._id} className="property-card">
                        <img src={property.images[0] || "default-image.jpg"} alt={property.title} />
                        <div className="content">
                            <h3 className="title">{property.title}</h3>
                            <p className="price">${property.price.toLocaleString()}</p>
                            <p className="location">{property.location}</p>
                            <Link to={`/properties/${property._id}`} className="view-btn">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Properties;
