import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

// Helper to find user by email
const findUserByEmail = async (email) => {
  const user =
    (await User.findOne({ email })) || (await Doctor.findOne({ email }));
  return user;
};

// Register User
export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  // Validate role
  const validRoles = ["patient", "doctor"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ success: false, message: "Invalid role" });
  }

  try {
    const existingUser = await findUserByEmail(email);

    // Check if user already exists
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user based on role
    const userModel = role === "patient" ? User : Doctor;
    const user = new userModel({
      name,
      email,
      password: hashPassword,
      photo,
      gender,
      role,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User successfully registered",
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Login User
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare passwords
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    // Exclude sensitive data from response
    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      token,
      user: userData,
      role: user.role,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({
      success: false,
      message: "Failed to login. Please try again later.",
    });
  }
};
