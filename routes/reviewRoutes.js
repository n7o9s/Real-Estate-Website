import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import Review from "../models/Review.js";
import Property from "../models/property.js";

const router = express.Router();

// submit Review (Requires Authentication)
router.post("/", authenticate, async (req, res) => {
    try {
        const { propertyId, rating, comment } = req.body;
        const userId = req.user.userId;

        // check if the property exists
        const propertyExists = await Property.findById(propertyId);
        if (!propertyExists) {
            return res.status(404).json({ error: "Property not found" });
        }

        // save review
        const review = new Review({ userId, propertyId, rating, comment });
        await review.save();

        res.status(201).json({ message: "Review submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// get Reviews for a Property
router.get("/:propertyId", async (req, res) => {
    try {
        const { propertyId } = req.params;

        // find all reviews for the given property
        const reviews = await Review.find({ propertyId }).populate("userId", "name");
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
