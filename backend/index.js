import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";

// Load environment variables
dotenv.config();

// Set up MongoDB URL and port
const MONGO_URL =
  process.env.MONGO_URL || "mongodb://localhost:27017/medicare_booking";
const port = process.env.PORT || 8000;

const app = express();

// CORS configuration
const corsOptions = {
  origin: [" http://localhost:5173/"], // Replace with your frontend URL
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev")); // Log HTTP requests

// Test route to check if the API is working
app.get("/", (req, res) => {
  res.send("API is working");
});

// Connect to MongoDB
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB database is connected");
  } catch (err) {
    console.error("MongoDB connection failed", err);
    process.exit(1); // Terminate process if DB connection fails
  }
};

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);

// Start the server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});
