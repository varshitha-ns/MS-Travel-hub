import bcrypt from "bcryptjs";
import User from "../models/User.js";

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