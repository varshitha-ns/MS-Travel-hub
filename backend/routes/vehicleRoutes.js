import express from "express";

import {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  updateVehicleStatus
} from "../controllers/vehicleController.js";

import {
  validateVehicle,
  validateVehicleUpdate,
  validateVehicleStatus
} from "../middleware/vehicleValidation.js";

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

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validateVehicleUpdate,
  updateVehicle
);

router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  validateVehicleStatus,
  updateVehicleStatus
);

export default router;