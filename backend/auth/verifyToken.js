import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  // Check if the token exists and starts with "Bearer"
  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (err) {
    const errorMessage =
      err.name === "TokenExpiredError"
        ? "Token is expired"
        : "Invalid token, authorization denied";

    return res.status(401).json({ success: false, message: errorMessage });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  try {
    const userId = req.userId;

    // Find user from either User or Doctor models
    const user =
      (await User.findById(userId)) || (await Doctor.findById(userId));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You are not authorized to access this resource",
        });
    }

    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
