import express from "express";
import {
  getAllReviews,
  createReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { body, validationResult } from "express-validator";

const router = express.Router({ mergeParams: true });

// Input validation middleware for creating reviews
const validateReviewInput = [
  body("rating")
    .isInt({ min: 0, max: 5 })
    .withMessage("Rating must be between 0 and 5"),
  body("reviewText")
    .isLength({ min: 1 })
    .withMessage("Review text cannot be empty"),
];

// Route for fetching all reviews and creating a new review
router
  .route("/")
  .get(getAllReviews)
  .post(
    authenticate,
    restrict(["patient"]),
    validateReviewInput,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
      next();
    },
    createReview
  );

export default router;
