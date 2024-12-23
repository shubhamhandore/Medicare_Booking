import express from "express";
import {
  updatedUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  getUserProfile,
  getMyAppointments,
} from "../Controllers/userController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

// Route to get a single user by ID (admin only)
router.get("/:id", authenticate, restrict(["admin"]), getSingleUser);

// Route to get all users (admin only)
router.get("/", authenticate, restrict(["admin"]), getAllUser);

// Route to update user information
router.put("/:id", authenticate, restrict(["patient"]), updatedUser);

// Route to delete a user (patient can delete themselves, admin can delete any)
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);

// Route to get the logged-in user's profile (only authenticated user)
router.get("/me", authenticate, getUserProfile);

// Route to get logged-in user's appointments
router.get(
  "/appointments/my-appointments",
  authenticate,
  restrict(["patient"]),
  getMyAppointments
);

export default router;
