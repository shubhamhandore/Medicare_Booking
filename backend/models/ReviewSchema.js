import mongoose from "mongoose";
import Doctor from "./DoctorSchema.js";

const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true, // Ensure every review is linked to a doctor
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true, // Ensure every review is linked to a user
    },
    reviewText: {
      type: String,
      required: true,
      trim: true, // Remove extra whitespace
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

// Middleware to populate user details when querying reviews
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo", // Only fetch required fields
  });
  next();
});

// Static method to calculate average ratings for a doctor
reviewSchema.statics.calcAverageRatings = async function (doctorId) {
  try {
    const stats = await this.aggregate([
      { $match: { doctor: doctorId } },
      {
        $group: {
          _id: "$doctor",
          numOfRating: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
    ]);

    if (stats.length > 0) {
      await Doctor.findByIdAndUpdate(doctorId, {
        totalRating: stats[0].numOfRating,
        averageRating: stats[0].avgRating,
      });
    } else {
      // No reviews exist for this doctor, reset ratings
      await Doctor.findByIdAndUpdate(doctorId, {
        totalRating: 0,
        averageRating: 0,
      });
    }
  } catch (error) {
    console.error(`Error calculating average ratings: ${error.message}`);
  }
};

// Trigger average rating calculation after a review is saved
reviewSchema.post("save", function () {
  this.constructor.calcAverageRatings(this.doctor);
});

// Trigger average rating recalculation after a review is deleted
reviewSchema.post("remove", function () {
  this.constructor.calcAverageRatings(this.doctor);
});

export default mongoose.model("Review", reviewSchema);
