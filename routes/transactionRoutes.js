import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import Transaction from "../models/Transaction.js";
import Property from "../models/property.js";

const router = express.Router();

// initiate Payment (Requires Authentication)
router.post("/", authenticate, async (req, res) => {
    try {
        const { propertyId, amount, paymentMethod } = req.body;
        const userId = req.user.userId;

        // check if property exists
        const propertyExists = await Property.findById(propertyId);
        if (!propertyExists) {
            return res.status(404).json({ error: "Property not found" });
        }

        // save transaction
        const transaction = new Transaction({ userId, propertyId, amount, paymentMethod, status: "completed" });
        await transaction.save();

        res.status(201).json({ message: "Payment successful", transactionId: transaction._id });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// get Transactions for a User
router.get("/", authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const transactions = await Transaction.find({ userId }).populate("propertyId");

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
