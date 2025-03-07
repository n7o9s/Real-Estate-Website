import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    images: [{ type: String, required: true }], // supports multiple images
    description: { type: String, required: true },
    sellerEmail: { type: String, required: true }, // store seller email for inquiries
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);
export default Property;
