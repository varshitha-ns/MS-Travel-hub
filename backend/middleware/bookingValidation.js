import { body, validationResult } from "express-validator";

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array()
    });
  }

  next();
};


// Create booking validation
export const validateBooking = [
  body("vehicle")
    .trim()
    .notEmpty()
    .withMessage("Vehicle ID is required")
    .isMongoId()
    .withMessage("Invalid vehicle ID"),

  body("bookingType")
    .isIn([
      "one_way",
      "round_trip",
      "local_rental",
      "airport_transfer"
    ])
    .withMessage("Invalid booking type"),

  body("pickupLocation")
    .trim()
    .notEmpty()
    .withMessage("Pickup location is required")
    .isLength({ max: 200 })
    .withMessage("Pickup location is too long"),

  body("dropLocation")
    .trim()
    .notEmpty()
    .withMessage("Drop location is required")
    .isLength({ max: 200 })
    .withMessage("Drop location is too long"),

  body("pickupDateTime")
    .notEmpty()
    .withMessage("Pickup date and time is required")
    .isISO8601()
    .withMessage("Invalid pickup date and time"),

  body("returnDateTime")
    .notEmpty()
    .withMessage("Return date and time is required")
    .isISO8601()
    .withMessage("Invalid return date and time"),

  body("pricing")
    .notEmpty()
    .withMessage("Pricing information is required")
    .isObject()
    .withMessage("Pricing must be an object"),

  body("pricing.baseAmount")
    .isFloat({ min: 0 })
    .withMessage("Base amount must be a positive number"),

  body("pricing.driverBata")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Driver bata must be a positive number"),

  body("pricing.tollCharges")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Toll charges must be a positive number"),

  body("pricing.parkingCharges")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Parking charges must be a positive number"),

  body("pricing.interstateTax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Interstate tax must be a positive number"),

  body("pricing.otherCharges")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Other charges must be a positive number"),

  body("pricing.discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be a positive number"),


  
  body("notes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters"),

  handleValidationErrors
];


// Admin booking status validation
export const validateBookingStatus = [
  body("status")
    .isIn([
      "pending",
      "confirmed",
      "ongoing",
      "completed",
      "cancelled"
    ])
    .withMessage("Invalid booking status"),

  handleValidationErrors
];