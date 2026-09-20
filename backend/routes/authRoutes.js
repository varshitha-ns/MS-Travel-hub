import express from "express";

import { registerUser } from "../controllers/authController.js";
import { validateRegistration } from "../middleware/authValidation.js";

const router = express.Router();

router.post("/register", validateRegistration, registerUser);

export default router;