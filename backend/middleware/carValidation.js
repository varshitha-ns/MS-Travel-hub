import { body, query, validationResult } from "express-validator";

export const validateCar = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Car name is required"),

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
    .withMessage("Invalid car category"),

  body("transmission")
    .isIn(["Manual", "Automatic"])
    .withMessage("Transmission must be Manual or Automatic"),

  body("fuelType")
    .isIn(["Petrol", "Diesel", "CNG", "Electric", "Hybrid"])
    .withMessage("Invalid fuel type"),

  body("seatingCapacity")
    .isInt({ min: 1 })
    .withMessage("Seating capacity must be a positive number"),

  body("pricePerDay")
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required"),

  body("description")
    .optional()
    .trim(),

  body("features")
    .optional()
    .isArray()
    .withMessage("Features must be an array"),

  body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

  body("isAvailable")
    .optional()
    .isBoolean()
    .withMessage("isAvailable must be true or false"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array()
      });
    }

    next();
  }
];