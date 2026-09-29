import express from "express";

import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
  checkVehicleAvailability
} from "../controllers/bookingController.js";

import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

import {
  validateBooking,
  validateBookingStatus
} from "../middleware/bookingValidation.js";

const router = express.Router();


// Customer routes

router.post(
  "/",
  protect,
  authorize("customer"),
  validateBooking,
  createBooking
);

router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyBookings
);

router.get(
  "/availability",
  protect,
  authorize("customer"),
  checkVehicleAvailability
);

router.get(
  "/:id",
  protect,
  getBookingById
);


router.patch(
  "/:id/cancel",
  protect,
  authorize("customer"),
  cancelBooking
);


// Admin routes

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllBookings
);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  validateBookingStatus,
  updateBookingStatus
);


export default router;