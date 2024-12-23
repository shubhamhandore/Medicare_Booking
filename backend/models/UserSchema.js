import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String, // Changed to `String` to handle numbers with leading zeros or country codes
      trim: true,
    },
    photo: {
      type: String,
      default: "default-avatar.jpg", // Provide a default avatar
    },
    role: {
      type: String,
      enum: ["patient", "admin"],
      default: "patient",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    bloodType: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], // Validate blood types
    },
    appointments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Appointment",
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Middleware for data preprocessing or validation
UserSchema.pre("save", function (next) {
  // Add any necessary logic before saving a user, e.g., hashing the password
  next();
});

export default mongoose.model("User", UserSchema);
