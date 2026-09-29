import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    isActive: {
      type: Boolean,
      default: true
    },

    priority: {
      type: Number,
      default: 0,
      min: 0
    },

    applicableTo: {
      vehicleCategories: {
        type: [String],
        enum: [
          "Hatchback",
          "Sedan",
          "SUV",
          "MUV",
          "Luxury"
        ],
        default: []
      },

      bookingTypes: {
        type: [String],
        enum: [
          "one_way",
          "round_trip",
          "local_rental",
          "airport_transfer"
        ],
        default: []
      },

      locations: {
        type: [String],
        default: []
      }
    },

    pricing: {
      baseFare: {
        type: Number,
        default: 0,
        min: 0
      },

      pricePerKm: {
        type: Number,
        default: 0,
        min: 0
      },

      pricePerHour: {
        type: Number,
        default: 0,
        min: 0
      },

      pricePerDay: {
        type: Number,
        default: 0,
        min: 0
      },

      driverBataPerDay: {
        type: Number,
        default: 0,
        min: 0
      },

      driverBataPerHour: {
        type: Number,
        default: 0,
        min: 0
      },

      extraKmCharge: {
        type: Number,
        default: 0,
        min: 0
      },

      extraHourCharge: {
        type: Number,
        default: 0,
        min: 0
      },

      airportCharge: {
        type: Number,
        default: 0,
        min: 0
      },

      oneWayCharge: {
        type: Number,
        default: 0,
        min: 0
      },

      tollIncluded: {
        type: Boolean,
        default: false
      },

      parkingIncluded: {
        type: Boolean,
        default: false
      },

      interstateTax: {
        type: Number,
        default: 0,
        min: 0
      },

      gstPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      },

      discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
      }
    },

    validFrom: {
      type: Date
    },

    validUntil: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const PricingRule = mongoose.model(
  "PricingRule",
  pricingRuleSchema
);

export default PricingRule;