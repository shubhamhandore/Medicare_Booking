import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, // Ensure consistent case
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true, // Remove extra whitespace
    },
    phone: {
      type: String, // Changed to String to allow flexible formats (e.g., with country codes)
    },
    photo: {
      type: String,
    },
    ticketPrice: {
      type: Number,
      default: 0, // Set a default value
    },
    role: {
      type: String,
      default: "doctor", // Default to 'doctor' role
    },

    // Doctor-specific fields
    specialization: {
      type: String,
      trim: true,
    },
    qualifications: {
      type: [String], // Use array of strings for better clarity
    },
    experiences: {
      type: [String], // Use array of strings for uniformity
    },
    bio: {
      type: String,
      maxLength: 150, // Increased max length for more flexibility
      trim: true,
    },
    about: {
      type: String,
      trim: true,
    },
    timeSlots: {
      type: [String], // Use array of strings for storing formatted time slots
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5, // Restrict range to 0-5
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);
