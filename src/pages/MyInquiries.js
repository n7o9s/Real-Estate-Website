// For Fututre updt

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const MyInquiries = () => {
//     const [inquiries, setInquiries] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchInquiries = async () => {
//             try {
//                 const token = localStorage.getItem("token"); // Get JWT token
//                 if (!token) {
//                     alert("You must be logged in to view inquiries.");
//                     return;
//                 }

//                 const response = await axios.get("http://localhost:3000/inquiries", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setInquiries(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching inquiries:", error);
//                 setLoading(false);
//             }
//         };

//         fetchInquiries();
//     }, []);

//     if (loading) return <p className="text-center text-lg">Loading...</p>;
//     if (inquiries.length === 0) return <p className="text-center text-lg text-gray-600">No inquiries sent.</p>;

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">My Inquiries</h1>
//             <div className="space-y-4">
//                 {inquiries.map((inquiry) => (
//                     <div key={inquiry._id} className="p-4 border rounded-md shadow-lg">
//                         <h2 className="text-xl font-semibold">
//                             Property: <Link to={`/properties/${inquiry.propertyId._id}`} className="text-blue-600">
//                                 {inquiry.propertyId.title}
//                             </Link>
//                         </h2>
//                         <p className="text-gray-500">Message: {inquiry.message}</p>
//                         <p className="text-gray-400 text-sm">Sent on: {new Date(inquiry.createdAt).toLocaleString()}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default MyInquiries;
