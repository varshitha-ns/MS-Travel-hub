import Car from "../models/Car.js"

export const createCar = async(req,res)=>{
    try{
        const car = await Car.create(req.body);

        res.status(201).json({
           sucess:true,
           message: "Car created successfully",
           data:car
        });
    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message:"Failed to create a car",
            error:error.message
        })
    }
};

export const getCars = async (req, res) => {
  try {
    const {
      location,
      category,
      transmission,
      fuelType,
      seatingCapacity,
      minPrice,
      maxPrice,
      isAvailable
    } = req.query;

    const filter = {};

    // Location filter
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i"
      };
    }

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Transmission filter
    if (transmission) {
      filter.transmission = transmission;
    }

    // Fuel type filter
    if (fuelType) {
      filter.fuelType = fuelType;
    }

    // Seating capacity filter
    if (seatingCapacity) {
      filter.seatingCapacity = Number(seatingCapacity);
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};

      if (minPrice) {
        filter.pricePerDay.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.pricePerDay.$lte = Number(maxPrice);
      }
    }

    // Availability filter
    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    const cars = await Car.find(filter);

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    console.error("Get cars error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message
    });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    res.status(200).json({
      success: true,
      data: car
    });
  } catch (error) {
    console.error("Get car by ID error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch car",
      error: error.message
    });
  }
};

export const updateCar = async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar
    });
  } catch (error) {
    console.error("Update car error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to update car",
      error: error.message
    });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Car deleted successfully",
      data: deletedCar
    });
  } catch (error) {
    console.error("Delete car error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to delete car",
      error: error.message
    });
  }
};