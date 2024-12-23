import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: {
      type: Number, // Changed to Number for proper numeric operations
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    isPaid: {
      type: Boolean,
      default: false, // Default to false as payment status should reflect the actual state
    },
  },
  { timestamps: true }
);

// Automatically populate doctor and user fields on queries
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email", // Select only necessary fields
  }).populate({
    path: "doctor",
    select: "name specialization photo", // Select necessary fields
  });
  next();
});

export default mongoose.model("Booking", bookingSchema);
