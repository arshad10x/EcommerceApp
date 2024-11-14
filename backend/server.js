// Import required dependencies
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Establish MongoDB Atlas connection using mongoose
// Using a connection string with credentials
mongoose
    .connect("mongodb+srv://arshadahmed:Arshad123@cluster0.tndlc.mongodb.net/")
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(err);
    });

// Initialize Express application
const app = express();
// Set port number from environment variable or default to 5000
const PORT = process.env.PORT || 5000;
// Configure CORS middleware
app.use(
    cors({
        origin: "http://localhost:5173/", // Allow requests from React dev server
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ], // Allowed request headers
        credentials: true,
    })
);
// Parse cookies in incoming requests
app.use(cookieParser());
// Parse JSON payloads in request body
app.use(express.json());

// Run server on specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
