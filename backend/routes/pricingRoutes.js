import express from "express";

import {
  createPricingRule,
  getPricingRules,
  getPricingRuleById,
  updatePricingRule,
  togglePricingRule
} from "../controllers/pricingController.js";

import {
  validatePricingRule,
  validatePricingRuleUpdate
} from "../middleware/pricingValidation.js";

import {
  protect,
  authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();


// Admin only

router.post(
  "/",
  protect,
  authorize("admin"),
  validatePricingRule,
  createPricingRule
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getPricingRules
);

router.get(
  "/:id",
  protect,
  authorize("admin"),
  getPricingRuleById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  validatePricingRuleUpdate,
  updatePricingRule
);

router.patch(
  "/:id/toggle",
  protect,
  authorize("admin"),
  togglePricingRule
);

export default router;