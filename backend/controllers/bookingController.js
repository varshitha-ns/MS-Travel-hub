import Booking from "../models/Booking.js";
import Vehicle from "../models/Vehicle.js";
import calculateBookingPrice from"../utils/calculateBookingPrice.js";

export const createBooking = async (req, res) => {
  try {
    const {
      vehicle,
      bookingType,
      pickupLocation,
      dropLocation,
      pickupDateTime,
      returnDateTime,
      pricing,
      notes
    } = req.body;

    // 1. Validate pickup and return time
    const pickup = new Date(pickupDateTime);
    const returnTime = new Date(returnDateTime);

    if (pickup >= returnTime) {
      return res.status(400).json({
        success: false,
        message: "Return date and time must be after pickup date and time"
      });
    }

    const selectedVehicle = await Vehicle.findById(vehicle);

if (!selectedVehicle) {
  return res.status(404).json({
    success: false,
    message: "Vehicle not found"
  });
}

if (
  selectedVehicle.status === "maintenance" ||
  selectedVehicle.status === "inactive"
) {
  return res.status(409).json({
    success: false,
    message: "Vehicle is currently unavailable"
  });
}

    // 2. Check whether the vehicle is already booked
    const overlappingBooking = await Booking.findOne({
      vehicle,
      bookingStatus: {
        $in: ["pending", "confirmed", "ongoing"]
      },
      pickupDateTime: {
        $lt: returnTime
      },
      returnDateTime: {
        $gt: pickup
      }
    });

    if (overlappingBooking) {
      return res.status(409).json({
        success: false,
        message: "Vehicle is not available for the selected dates and time"
      });
    }

    // 3. Create the booking
    const booking = await Booking.create({
      customer: req.user._id,
      vehicle,
      bookingType,
      pickupLocation,
      dropLocation,
      pickupDateTime: pickup,
      returnDateTime: returnTime,
      pricing,
      notes
    });

    // 4. Return created booking
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking
    });
  } catch (error) {
    console.error("Create booking error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create booking"
    });
  }
};


export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      customer: req.user._id
    })
      .populate(
        "vehicle",
        "vehicleNumber brand model category seatingCapacity currentLocation"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error("Get my bookings error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings"
    });
  }
};


export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate(
        "vehicle",
        "vehicleNumber brand model category seatingCapacity currentLocation"
      )
      .populate(
        "customer",
        "firstName lastName email phone"
      );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error("Get booking error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch booking"
    });
  }
};


export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    if (booking.customer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this booking"
      });
    }

    if (
      booking.bookingStatus === "completed" ||
      booking.bookingStatus === "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: `Booking is already ${booking.bookingStatus}`
      });
    }

    booking.bookingStatus = "cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking
    });
  } catch (error) {
    console.error("Cancel booking error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to cancel booking"
    });
  }
};


export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate(
        "customer",
        "firstName lastName email phone"
      )
      .populate(
        "vehicle",
        "vehicleNumber brand model category"
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    console.error("Get all bookings error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings"
    });
  }
};


export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        bookingStatus: status
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      data: booking
    });
  } catch (error) {
    console.error("Update booking status error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update booking status"
    });
  }
};

export const checkVehicleAvailability = async (req, res) => {
  try {
    const {
      vehicle,
      pickupDateTime,
      returnDateTime
    } = req.query;

    // 1. Check required parameters
    if (!vehicle || !pickupDateTime || !returnDateTime) {
      return res.status(400).json({
        success: false,
        message: "Vehicle, pickup date/time and return date/time are required"
      });
    }

    // 2. Validate dates
    const pickup = new Date(pickupDateTime);
    const returnTime = new Date(returnDateTime);

    if (
      Number.isNaN(pickup.getTime()) ||
      Number.isNaN(returnTime.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date or time"
      });
    }

    if (pickup >= returnTime) {
      return res.status(400).json({
        success: false,
        message: "Return date and time must be after pickup date and time"
      });
    }

    // 3. Check vehicle
    const selectedVehicle = await Vehicle.findById(vehicle);

    if (!selectedVehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    // 4. Check operational status
    if (
      selectedVehicle.status === "maintenance" ||
      selectedVehicle.status === "inactive"
    ) {
      return res.status(200).json({
        success: true,
        available: false,
        message: "Vehicle is currently unavailable"
      });
    }

    // 5. Check booking overlap
    const overlappingBooking = await Booking.findOne({
      vehicle,
      bookingStatus: {
        $in: ["pending", "confirmed", "ongoing"]
      },
      pickupDateTime: {
        $lt: returnTime
      },
      returnDateTime: {
        $gt: pickup
      }
    });

    // 6. Return availability
    if (overlappingBooking) {
      return res.status(200).json({
        success: true,
        available: false,
        message: "Vehicle is already booked for the selected period"
      });
    }

    res.status(200).json({
      success: true,
      available: true,
      message: "Vehicle is available for the selected period"
    });

  } catch (error) {
    console.error(
      "Check vehicle availability error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to check vehicle availability"
    });
  }
};