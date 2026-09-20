import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import carRoutes from "./routes/carRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
dotenv.config();

connectDB();

const app=express();
const PORT=process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/cars", carRoutes);
app.use ("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
//HealthCheck
app.get("/",(req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"MS Travel Hub API is running successfully"
    });
    });

app.listen(PORT,()=>{
    console.log(`MS Travel Hub server is running on port ${PORT}`);
});