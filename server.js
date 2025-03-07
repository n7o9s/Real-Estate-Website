import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// connect to Database
connectDB()
    .then(() => {
        console.log("✅ Connected to MongoDB");

        // middleware
        app.use(cors());
        app.use(express.json());

        // register Routes
        app.use("/properties", propertyRoutes);
        app.use("/auth", authRoutes);
        app.use("/inquiries", inquiryRoutes);

        app.get("/", (req, res) => {
            res.json({ message: "Server is running!" });
        });

        app.listen(PORT, () => {
            console.log(`✅ Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database Connection Error:", err);
        process.exit(1);
    });
