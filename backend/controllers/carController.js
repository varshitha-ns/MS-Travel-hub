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
    const cars = await Car.find();

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