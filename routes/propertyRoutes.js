import express from "express";
import multer from "multer";
import { authenticate } from "../middleware/authenticate.js";
import Property from "../models/property.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// ✅ Configure Multer for Cloudinary storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ List all properties
router.get("/", async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.error("Error fetching properties:", error);
        res.status(500).json({ error: "Failed to fetch properties." });
    }
});

// ✅ Fetch a single property by ID
router.get("/:id", async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).json({ error: "Property not found" });

        res.json(property);
    } catch (error) {
        console.error("Error retrieving property:", error);
        res.status(500).json({ error: "Failed to retrieve property." });
    }
});

// ✅ Route to List Property with Image Upload
router.post("/list", authenticate, upload.single("image"), async (req, res) => {
    try {
        const { title, price, location, bedrooms, bathrooms, description } = req.body;

        if (!title || !price || !location || !bedrooms || !bathrooms || !description) {
            return res.status(400).json({ error: "All fields are required." });
        }

        if (req.user.role !== "seller") {
            return res.status(403).json({ error: "Only sellers can list properties." });
        }

        // ✅ Upload Image to Cloudinary
        cloudinary.uploader.upload_stream({ folder: "real_estate" }, async (error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                return res.status(500).json({ error: "Image upload failed" });
            }

            const newProperty = new Property({
                title,
                price,
                location,
                bedrooms,
                bathrooms,
                description,
                images: [result.secure_url], // ✅ Store Cloudinary Image URL
                sellerEmail: req.user.email, // ✅ Store seller email for inquiries
            });

            await newProperty.save();
            res.status(201).json({ message: "Property listed successfully!", property: newProperty });
        }).end(req.file.buffer);
    } catch (error) {
        console.error("Error listing property:", error);
        res.status(500).json({ error: "Failed to list property." });
    }
});

export default router;
