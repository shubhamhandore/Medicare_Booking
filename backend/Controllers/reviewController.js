import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Get all reviews with optional filtering and pagination
export const getAllReviews = async (req, res) => {
  const { doctorId, userId, page = 1, limit = 10 } = req.query;

  try {
    const filter = {
      ...(doctorId && { doctor: doctorId }),
      ...(userId && { user: userId }),
    };

    const reviews = await Review.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("user", "name email") // Populate user information for better details
      .populate("doctor", "name"); // Populate doctor information

    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
      page: Number(page),
      total: reviews.length,
    });
  } catch (err) {
    console.error("Error retrieving reviews:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve reviews" });
  }
};

// Create a new review
export const createReview = async (req, res) => {
  try {
    // Ensure doctorId and userId are provided
    const doctorId = req.body.doctor || req.params.doctorId;
    const userId = req.body.user || req.userId;

    if (!doctorId || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor and User are required" });
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Optional: Check for duplicate reviews
    const existingReview = await Review.findOne({
      doctor: doctorId,
      user: userId,
    });
    if (existingReview) {
      return res
        .status(400)
        .json({ success: false, message: "Review already submitted" });
    }

    // Create and save the new review
    const newReview = new Review({
      ...req.body,
      doctor: doctorId,
      user: userId,
    });

    const savedReview = await newReview.save();

    // Associate the review with the doctor
    doctor.reviews.push(savedReview._id);
    await doctor.save();

    res.status(200).json({
      success: true,
      message: "Review submitted successfully",
      data: savedReview,
    });
  } catch (err) {
    console.error("Error creating review:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to submit review" });
  }
};
