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

export const validateVehicle = [
  body("vehicleNumber")
    .trim()
    .notEmpty()
    .withMessage("Vehicle number is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("Invalid vehicle number"),

  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required"),

  body("model")
    .trim()
    .notEmpty()
    .withMessage("Model is required"),

  body("category")
    .isIn(["Hatchback", "Sedan", "SUV", "MUV", "Luxury"])
    .withMessage("Invalid vehicle category"),

  body("year")
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage("Invalid vehicle year"),

  body("transmission")
    .isIn(["Manual", "Automatic"])
    .withMessage("Invalid transmission"),

  body("fuelType")
    .isIn(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"])
    .withMessage("Invalid fuel type"),

  body("seatingCapacity")
    .isInt({ min: 1, max: 50 })
    .withMessage("Invalid seating capacity"),

  body("currentLocation")
    .trim()
    .notEmpty()
    .withMessage("Current location is required"),

  body("odometerReading")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Odometer reading must be a positive number"),

  body("features")
    .optional()
    .isArray()
    .withMessage("Features must be an array"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  handleValidationErrors
];

export const validateVehicleUpdate = [
  body("vehicleNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Vehicle number cannot be empty"),

  body("brand")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Brand cannot be empty"),

  body("model")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Model cannot be empty"),

  body("category")
    .optional()
    .isIn(["Hatchback", "Sedan", "SUV", "MUV", "Luxury"])
    .withMessage("Invalid vehicle category"),

  body("year")
    .optional()
    .isInt({ min: 2000, max: new Date().getFullYear() + 1 })
    .withMessage("Invalid vehicle year"),

  body("transmission")
    .optional()
    .isIn(["Manual", "Automatic"])
    .withMessage("Invalid transmission"),

  body("fuelType")
    .optional()
    .isIn(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"])
    .withMessage("Invalid fuel type"),

  body("seatingCapacity")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Invalid seating capacity"),

  body("currentLocation")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Current location cannot be empty"),

  body("odometerReading")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Odometer reading must be a positive number"),

  body("features")
    .optional()
    .isArray()
    .withMessage("Features must be an array"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  handleValidationErrors
];

export const validateVehicleStatus = [
  body("status")
    .isIn([
      "available",
      "booked",
      "maintenance",
      "inactive"
    ])
    .withMessage("Invalid vehicle status"),

  handleValidationErrors
];