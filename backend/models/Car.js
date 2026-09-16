import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

    pricePerDay: {
      type: Number,
      required: true,
      min: 0
    },

    location: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    features: {
      type: [String],
      default: []
    },

    images: {
      type: [String],
      default: []
    },

    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Car = mongoose.model("Car", carSchema);

export default Car;