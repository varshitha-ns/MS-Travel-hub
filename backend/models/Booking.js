import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true
    },

    bookingType: {
      type: String,
      required: true,
      enum: [
        "one_way",
        "round_trip",
        "local_rental",
        "airport_transfer"
      ]
    },

    pickupLocation: {
      type: String,
      required: true,
      trim: true
    },

    dropLocation: {
      type: String,
      required: true,
      trim: true
    },

    pickupDateTime: {
      type: Date,
      required: true
    },

    returnDateTime: {
      type: Date,
      required: true
    },

    pricing: {
      baseAmount: {
        type: Number,
        required: true,
        min: 0
      },

      driverBata: {
        type: Number,
        default: 0,
        min: 0
      },

      tollCharges: {
        type: Number,
        default: 0,
        min: 0
      },

      parkingCharges: {
        type: Number,
        default: 0,
        min: 0
      },

      interstateTax: {
        type: Number,
        default: 0,
        min: 0
      },

      otherCharges: {
        type: Number,
        default: 0,
        min: 0
      },

      discount: {
        type: Number,
        default: 0,
        min: 0
      },

      tax: {
        type: Number,
        default: 0,
        min: 0
      },

      totalAmount: {
        type: Number,
        required: true,
        min: 0
      }
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded"
      ],
      default: "pending"
    },

    bookingStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "ongoing",
        "completed",
        "cancelled"
      ],
      default: "pending"
    },

    notes: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;