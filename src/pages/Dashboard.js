// FOR FUTURE UPDATE

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../styles/Dashboard.css"; // ✅ Ensure styles are linked

// function Dashboard() {
//     const [favorites, setFavorites] = useState([]);
//     const [inquiries, setInquiries] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         if (!userId) {
//             console.error("User not logged in.");
//             return;
//         }

//         axios
//             .get(`http://localhost:3000/favorites?userId=${userId}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             })
//             .then((response) => setFavorites(response.data))
//             .catch((error) => console.error("Error fetching favorites:", error));

//         axios
//             .get(`http://localhost:3000/inquiries?userId=${userId}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             })
//             .then((response) => setInquiries(response.data))
//             .catch((error) => console.error("Error fetching inquiries:", error));

//         setLoading(false);
//     }, [userId]);

//     if (!userId) return <p>Please log in to view your dashboard.</p>;
//     if (loading) return <p>Loading dashboard...</p>;

//     return (
//         <div className="dashboard-container">
//             <h2>👤 User Dashboard</h2>

//             {/* FAVORITES SECTION */}
//             <div className="dashboard-section">
//                 <h3>❤️ Saved Properties</h3>
//                 {favorites.length > 0 ? (
//                     <ul>
//                         {favorites.map((fav) => (
//                             <li key={fav._id}>
//                                 <Link to={`/properties/${fav.property._id}`}>{fav.property.title}</Link>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No saved properties yet.</p>
//                 )}
//             </div>

//             {/* INQUIRIES SECTION */}
//             <div className="dashboard-section">
//                 <h3>📩 My Inquiries</h3>
//                 {inquiries.length > 0 ? (
//                     <ul>
//                         {inquiries.map((inquiry) => (
//                             <li key={inquiry._id}>
//                                 <p><strong>Property:</strong> {inquiry.property.title}</p>
//                                 <p><strong>Message:</strong> {inquiry.message}</p>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No inquiries made yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Dashboard;
