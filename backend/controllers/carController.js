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
      isAvailable,
      page = 1,
      limit = 10,
      sort = "newest"
    } = req.query;

    const filter = {};

    // Location
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i"
      };
    }

    // Category
    if (category) {
      filter.category = category;
    }

    // Transmission
    if (transmission) {
      filter.transmission = transmission;
    }

    // Fuel type
    if (fuelType) {
      filter.fuelType = fuelType;
    }

    // Seating capacity
    if (seatingCapacity) {
      filter.seatingCapacity = Number(seatingCapacity);
    }

    // Price range
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};

      if (minPrice) {
        filter.pricePerDay.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.pricePerDay.$lte = Number(maxPrice);
      }
    }

    // Availability
    if (isAvailable !== undefined) {
      filter.isAvailable = isAvailable === "true";
    }

    // Pagination
    const currentPage = Math.max(Number(page), 1);
    const itemsPerPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * itemsPerPage;

    // Sorting
    let sortOption = { createdAt: -1 };

    switch (sort) {
      case "price_asc":
        sortOption = { pricePerDay: 1 };
        break;

      case "price_desc":
        sortOption = { pricePerDay: -1 };
        break;

      case "seats":
        sortOption = { seatingCapacity: -1 };
        break;

      case "name":
        sortOption = { name: 1 };
        break;

      case "newest":
      default:
        sortOption = { createdAt: -1 };
        break;
    }

    // Get total number of matching cars
    const totalCars = await Car.countDocuments(filter);

    // Get paginated cars
    const cars = await Car.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage);

    const totalPages = Math.ceil(totalCars / itemsPerPage);

    res.status(200).json({
      success: true,
      count: cars.length,
      total: totalCars,
      page: currentPage,
      limit: itemsPerPage,
      totalPages,
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