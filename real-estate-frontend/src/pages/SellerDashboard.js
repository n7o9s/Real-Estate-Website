// For Futurre UPPDAte 

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../styles/Dashboard.css";

// function Dashboard() {
//     const [properties, setProperties] = useState([]);
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [location, setLocation] = useState("");
//     const [bedrooms, setBedrooms] = useState("");
//     const [bathrooms, setBathrooms] = useState("");
//     const [propertyType, setPropertyType] = useState("house");
//     const [images, setImages] = useState([]);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//     const token = localStorage.getItem("token");
//     const userRole = localStorage.getItem("role"); // assuming role is stored after login

//     useEffect(() => {
//         if (!token) {
//             navigate("/login"); // redirect if not logged in
//         } else if (userRole !== "seller") {
//             navigate("/"); // redirect buyers to home
//         }
//     }, [token, userRole, navigate]);

//     const handleFileUpload = (e) => {
//         const files = Array.from(e.target.files);
//         setImages(files);
//     };

//     const handleAddProperty = async (e) => {
//         e.preventDefault();
//         if (!title || !description || !price || !location || !bedrooms || !bathrooms) {
//             setError("All fields are required!");
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 "http://localhost:3000/properties",
//                 { title, description, price, location, bedrooms, bathrooms, propertyType, images },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             console.log("Property Added:", response.data);
//             setProperties([...properties, response.data.property]);
//             alert("Property listed successfully!");
//         } catch (error) {
//             console.error("Error listing property:", error);
//             setError("Failed to list property. Please try again.");
//         }
//     };

//     return (
//         <div className="dashboard-container">
//             <h2>📢 Seller Dashboard</h2>
//             <p>List and manage your properties.</p>

//             <form onSubmit={handleAddProperty} className="property-form">
//                 {error && <p className="error-text">{error}</p>}

//                 <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//                 <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
//                 <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
//                 <input type="number" placeholder="Bedrooms" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required />
//                 <input type="number" placeholder="Bathrooms" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} required />

//                 <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
//                     <option value="house">House</option>
//                     <option value="apartment">Apartment</option>
//                     <option value="room">Room</option>
//                 </select>

//                 <input type="file" multiple onChange={handleFileUpload} />
//                 <button type="submit" className="add-btn">List Property</button>
//             </form>

//             <h3>🏡 My Properties</h3>
//             <div className="property-list">
//                 {properties.length > 0 ? (
//                     properties.map((property) => (
//                         <div key={property._id} className="property-card">
//                             <h4>{property.title}</h4>
//                             <p>{property.location}</p>
//                             <p>${property.price.toLocaleString()}</p>
//                             <button className="delete-btn">Delete</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No properties listed yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Dashboard;
