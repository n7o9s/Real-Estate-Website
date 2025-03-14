import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/Properties.css";

function Properties() {
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [allProperties, setAllProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams(location.search).toString();
                const response = await axios.get(`http://localhost:3000/api/properties/filter?${queryParams}`);

                setFilteredProperties(response.data.filteredProperties);
                setAllProperties(response.data.allProperties);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
            setLoading(false);
        };

        fetchProperties();
    }, [location.search]);

    return (
        <div className="property-list">
            <h2 className="section-title">🏡 Properties</h2>

            {loading ? (
                <p>Loading properties...</p>
            ) : (
                <>
                    {/* ✅ Search Results */}
                    <h3 className="filter-title">🔎 Search Results</h3>
                    {filteredProperties.length > 0 ? (
                        <div className="property-grid">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property._id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <p className="no-results">❌ No available properties matching your search.</p>
                    )}

                    {/* ✅ All Listed Properties */}
                    <h3 className="all-listings-title">🌍 Other Listed Properties</h3>
                    <div className="property-grid">
                        {allProperties.map((property) => (
                            <PropertyCard key={property._id} property={property} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

const PropertyCard = ({ property }) => (
    <div className="property-card">
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
);

export default Properties;
