import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    brand: {
      type: String,
      required: true,
      trim: true
    },

    model: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      enum: ["Hatchback", "Sedan", "SUV", "MUV", "Luxury"]
    },

    year: {
      type: Number,
      required: true,
      min: 2000
    },

    transmission: {
      type: String,
      required: true,
      enum: ["Manual", "Automatic"]
    },

    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "CNG", "Electric", "Hybrid"]
    },

    seatingCapacity: {
      type: Number,
      required: true,
      min: 1
    },

    currentLocation: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: [
        "available",
        "booked",
        "maintenance",
        "inactive"
      ],
      default: "available"
    },

    odometerReading: {
      type: Number,
      default: 0,
      min: 0
    },

    features: {
      type: [String],
      default: []
    },

    images: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;