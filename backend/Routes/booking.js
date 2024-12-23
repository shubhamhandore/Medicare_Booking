import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import bookingRoute from "./routes/bookingRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// CORS options can be configured dynamically
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Adjust according to your client URL
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// MongoDB connection function
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database is connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);

// Start server
app.listen(port, () => {
  connectDB(); // Ensure DB is connected before starting the server
  console.log(`Server is running on port ${port}`);
});
