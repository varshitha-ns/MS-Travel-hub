import express from "express";
import {
  createCar,
  getCars
} from "../controllers/carController.js";

const router = express.Router();

router.post("/", createCar);
router.get("/", getCars);

export default router;