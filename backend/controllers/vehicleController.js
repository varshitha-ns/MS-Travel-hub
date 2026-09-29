import Vehicle from "../models/Vehicle.js";

export const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicle
    });
  } catch (error) {
    console.error("Create vehicle error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A vehicle with this registration number already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create vehicle"
    });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: vehicles.length,
      data: vehicles
    });
  } catch (error) {
    console.error("Get vehicles error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles"
    });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle
    });
  } catch (error) {
    console.error("Get vehicle error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle"
    });
  }
};

export const updateVehicle = async (req,res)=>{
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
       req.body, 
      { new: true,
        runValidators: true
       }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle
    });
  } catch (error) {
    console.error("Update vehicle error:", error.message);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A vehicle with this registration number already exists"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update vehicle"
    });
  }
}

export const updateVehicleStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle status updated successfully",
      data: vehicle
    });
  } catch (error) {
    console.error("Update vehicle status error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update vehicle status"
    });
  }
};