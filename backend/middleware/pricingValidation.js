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


const vehicleCategories = [
  "Hatchback",
  "Sedan",
  "SUV",
  "MUV",
  "Luxury"
];

const bookingTypes = [
  "one_way",
  "round_trip",
  "local_rental",
  "airport_transfer"
];


// Create pricing rule
export const validatePricingRule = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Pricing rule name is required")
    .isLength({ max: 100 })
    .withMessage("Pricing rule name cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  body("priority")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Priority must be a non-negative integer"),

  body("applicableTo")
    .optional()
    .isObject()
    .withMessage("applicableTo must be an object"),

  body("applicableTo.vehicleCategories")
    .optional()
    .isArray()
    .withMessage("Vehicle categories must be an array"),

  body("applicableTo.vehicleCategories.*")
    .optional()
    .isIn(vehicleCategories)
    .withMessage("Invalid vehicle category"),

  body("applicableTo.bookingTypes")
    .optional()
    .isArray()
    .withMessage("Booking types must be an array"),

  body("applicableTo.bookingTypes.*")
    .optional()
    .isIn(bookingTypes)
    .withMessage("Invalid booking type"),

  body("applicableTo.locations")
    .optional()
    .isArray()
    .withMessage("Locations must be an array"),

  body("applicableTo.locations.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  // Pricing fields

  body("pricing")
    .notEmpty()
    .withMessage("Pricing configuration is required")
    .isObject()
    .withMessage("Pricing must be an object"),

  body("pricing.baseFare")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Base fare must be a non-negative number"),

  body("pricing.pricePerKm")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price per km must be a non-negative number"),

  body("pricing.pricePerHour")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price per hour must be a non-negative number"),

  body("pricing.pricePerDay")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a non-negative number"),

  body("pricing.driverBataPerDay")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Driver bata per day must be a non-negative number"),

  body("pricing.driverBataPerHour")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Driver bata per hour must be a non-negative number"),

  body("pricing.extraKmCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Extra km charge must be a non-negative number"),

  body("pricing.extraHourCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Extra hour charge must be a non-negative number"),

  body("pricing.airportCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Airport charge must be a non-negative number"),

  body("pricing.oneWayCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("One-way charge must be a non-negative number"),

  body("pricing.tollIncluded")
    .optional()
    .isBoolean()
    .withMessage("tollIncluded must be true or false"),

  body("pricing.parkingIncluded")
    .optional()
    .isBoolean()
    .withMessage("parkingIncluded must be true or false"),

  body("pricing.interstateTax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Interstate tax must be a non-negative number"),

  body("pricing.gstPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("GST percentage must be between 0 and 100"),

  body("pricing.discountPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percentage must be between 0 and 100"),

  // Validity period

  body("validFrom")
    .optional()
    .isISO8601()
    .withMessage("Invalid validFrom date"),

  body("validUntil")
    .optional()
    .isISO8601()
    .withMessage("Invalid validUntil date"),

  handleValidationErrors
];


// Update pricing rule
export const validatePricingRuleUpdate = [
  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Pricing rule name cannot be empty")
    .isLength({ max: 100 })
    .withMessage("Pricing rule name cannot exceed 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),

  body("priority")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Priority must be a non-negative integer"),

  body("applicableTo")
    .optional()
    .isObject()
    .withMessage("applicableTo must be an object"),

  body("applicableTo.vehicleCategories")
    .optional()
    .isArray()
    .withMessage("Vehicle categories must be an array"),

  body("applicableTo.vehicleCategories.*")
    .optional()
    .isIn(vehicleCategories)
    .withMessage("Invalid vehicle category"),

  body("applicableTo.bookingTypes")
    .optional()
    .isArray()
    .withMessage("Booking types must be an array"),

  body("applicableTo.bookingTypes.*")
    .optional()
    .isIn(bookingTypes)
    .withMessage("Invalid booking type"),

  body("applicableTo.locations")
    .optional()
    .isArray()
    .withMessage("Locations must be an array"),

  body("applicableTo.locations.*")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Location cannot be empty"),

  body("pricing")
    .optional()
    .isObject()
    .withMessage("Pricing must be an object"),

  body("pricing.baseFare")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Base fare must be a non-negative number"),

  body("pricing.pricePerKm")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price per km must be a non-negative number"),

  body("pricing.pricePerHour")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price per hour must be a non-negative number"),

  body("pricing.pricePerDay")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a non-negative number"),

  body("pricing.driverBataPerDay")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Driver bata per day must be a non-negative number"),

  body("pricing.driverBataPerHour")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Driver bata per hour must be a non-negative number"),

  body("pricing.extraKmCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Extra km charge must be a non-negative number"),

  body("pricing.extraHourCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Extra hour charge must be a non-negative number"),

  body("pricing.airportCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Airport charge must be a non-negative number"),

  body("pricing.oneWayCharge")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("One-way charge must be a non-negative number"),

  body("pricing.tollIncluded")
    .optional()
    .isBoolean()
    .withMessage("tollIncluded must be true or false"),

  body("pricing.parkingIncluded")
    .optional()
    .isBoolean()
    .withMessage("parkingIncluded must be true or false"),

  body("pricing.interstateTax")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Interstate tax must be a non-negative number"),

  body("pricing.gstPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("GST percentage must be between 0 and 100"),

  body("pricing.discountPercentage")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount percentage must be between 0 and 100"),

  body("validFrom")
    .optional()
    .isISO8601()
    .withMessage("Invalid validFrom date"),

  body("validUntil")
    .optional()
    .isISO8601()
    .withMessage("Invalid validUntil date"),

  handleValidationErrors
];