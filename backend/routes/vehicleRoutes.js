import express from "express";

import {
  createVehicle,
  getVehicles,
  getVehicleById
} from "../controllers/vehicleController.js";

import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("admin"),
  createVehicle
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getVehicles
);

router.get(
  "/:id",
  protect,
  authorize("admin"),
  getVehicleById
);

export default router;