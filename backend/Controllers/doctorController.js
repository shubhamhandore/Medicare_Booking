import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";

// Update a doctor's information
export const updateDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // Validate updates
    );

    if (!updatedDoctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor successfully updated",
      data: updatedDoctor,
    });
  } catch (err) {
    console.error("Error updating doctor:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to update doctor" });
  }
};

// Delete a doctor
export const deleteDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Doctor successfully deleted" });
  } catch (err) {
    console.error("Error deleting doctor:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete doctor" });
  }
};

// Get a single doctor's information
export const getSingleDoctor = async (req, res) => {
  const { id } = req.params;

  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor retrieved successfully",
      data: doctor,
    });
  } catch (err) {
    console.error("Error retrieving doctor:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve doctor" });
  }
};

// Get all approved doctors with optional search query
export const getAllDoctor = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query;

  try {
    const filter = {
      isApproved: "approved",
      ...(query && {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }),
    };

    const doctors = await Doctor.find(filter)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      message: "Doctors retrieved successfully",
      data: doctors,
      page: Number(page),
      total: doctors.length,
    });
  } catch (err) {
    console.error("Error retrieving doctors:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve doctors" });
  }
};

// Get the profile of a specific doctor
export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "Doctor profile retrieved successfully",
      data: { ...rest, appointments },
    });
  } catch (err) {
    console.error("Error retrieving doctor profile:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve profile" });
  }
};
