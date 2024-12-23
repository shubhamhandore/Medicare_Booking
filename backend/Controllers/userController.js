import User from "../models/UserSchema.js";
import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Update user
export const updatedUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User successfully updated",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User successfully deleted",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// Get single user by ID
export const getSingleUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    console.error("Error retrieving user:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user" });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (err) {
    console.error("Error retrieving users:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve users" });
  }
};

// Get user profile
export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "User profile retrieved",
      data: rest,
    });
  } catch (err) {
    console.error("Error retrieving user profile:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve profile" });
  }
};

// Get user's appointments
export const getMyAppointments = async (req, res) => {
  try {
    // Retrieve appointments from Booking
    const bookings = await Booking.find({ user: req.userId }).populate(
      "doctor",
      "name email specialization"
    );

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No appointments found",
      });
    }

    // Extract doctor details directly using populated data
    const doctors = bookings.map((booking) => booking.doctor);

    res.status(200).json({
      success: true,
      message: "Appointments retrieved successfully",
      data: doctors,
    });
  } catch (err) {
    console.error("Error retrieving appointments:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve appointments" });
  }
};
