import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password
    } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    // Check whether email already exists
    const existingEmail = await User.findOne({
      email: normalizedEmail
    });

    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists"
      });
    }

    // Check whether phone already exists
    const existingPhone = await User.findOne({
      phone: phone.trim()
    });

    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: "An account with this phone number already exists"
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create customer
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      passwordHash,
      role: "customer"
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error("Register user error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create account"
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role
        }
      }
    });
  } catch (error) {
    console.error("Login user error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to login"
    });
  }
};