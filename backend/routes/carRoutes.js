import express from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/carController.js";

const router = express.Router();

router.post("/", createCar);
router.get("/:id", getCarById);
router.get("/", getCars);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
export default router;