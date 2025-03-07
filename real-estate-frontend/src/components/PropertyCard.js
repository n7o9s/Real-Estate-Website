import React from "react";
import { Link } from "react-router-dom";
import "../styles/PropertyCard.css";

const PropertyCard = ({ property }) => {
    return (
        <div className="property-card">
            <img src={property.images[0]} alt={property.title} />
            <div className="content">
                <h2 className="title">{property.title}</h2>
                <p>{property.location}</p>
                <p className="price">${property.price}</p>
                <Link to={`/properties/${property._id}`} className="view-btn">View Details</Link>
            </div>
        </div>
    );
};

export default PropertyCard;
