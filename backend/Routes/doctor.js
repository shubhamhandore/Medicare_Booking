import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getAllDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";
// import validateObjectId from "../middlewares/validateObjectId.js";

const router = express.Router();

// Apply validation middleware for routes where IDs are used
router.use("/:doctorId/reviews", reviewRouter);
router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);
router.put(
  "/:id",

  authenticate,
  restrict(["doctor", "admin"]),
  updateDoctor
);
router.delete(
  "/:id",
  authenticate,
  restrict(["doctor", "admin"]),
  deleteDoctor
);
router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
