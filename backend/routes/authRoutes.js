import express from "express";

import {
  registerUser,
  loginUser
} from "../controllers/authController.js";

import {
  validateRegistration,
  validateLogin
} from "../middleware/authValidation.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  validateRegistration,
  registerUser
);

router.post(
  "/login",
  validateLogin,
  loginUser
);

router.get(
  "/me",
  protect,
  (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        phone: req.user.phone,
        role: req.user.role
      }
    });
  }
);

router.get("/customer-test", protect, authorize("customer"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Customer access granted"
  });
});

router.get("/admin-test", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin access granted"
  });
});

export default router;