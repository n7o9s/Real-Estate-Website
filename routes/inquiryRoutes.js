import express from "express";
import Inquiry from "../models/Inquiry.js";
import { authenticate } from "../middleware/authenticate.js";


const router = express.Router();

// Create Inquiry (Ensure User is Logged In)
router.post("/", authenticate, async (req, res) => {
    try {
        const { propertyId, buyerEmail, message } = req.body;

        if (!propertyId || !buyerEmail || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newInquiry = new Inquiry({ propertyId, buyerEmail, message });
        await newInquiry.save();

        res.json({ message: "Inquiry sent successfully!" });
    } catch (error) {
        console.error("Error sending inquiry:", error);
        res.status(500).json({ error: "Failed to send inquiry" });
    }
});

export default router;
