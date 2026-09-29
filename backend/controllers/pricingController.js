import PricingRule from "../models/PricingRule.js";

export const createPricingRule = async (req, res) => {
  try {
    const rule = await PricingRule.create(req.body);

    res.status(201).json({
      success: true,
      message: "Pricing rule created successfully",
      data: rule
    });
  } catch (error) {
    console.error("Create pricing rule error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to create pricing rule"
    });
  }
};


export const getPricingRules = async (req, res) => {
  try {
    const rules = await PricingRule.find()
      .sort({
        priority: -1,
        createdAt: -1
      });

    res.status(200).json({
      success: true,
      count: rules.length,
      data: rules
    });
  } catch (error) {
    console.error("Get pricing rules error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch pricing rules"
    });
  }
};


export const getPricingRuleById = async (req, res) => {
  try {
    const rule = await PricingRule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Pricing rule not found"
      });
    }

    res.status(200).json({
      success: true,
      data: rule
    });
  } catch (error) {
    console.error(
      "Get pricing rule error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch pricing rule"
    });
  }
};


export const updatePricingRule = async (req, res) => {
  try {
    const rule = await PricingRule.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Pricing rule not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Pricing rule updated successfully",
      data: rule
    });
  } catch (error) {
    console.error(
      "Update pricing rule error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update pricing rule"
    });
  }
};


export const togglePricingRule = async (req, res) => {
  try {
    const rule = await PricingRule.findById(req.params.id);

    if (!rule) {
      return res.status(404).json({
        success: false,
        message: "Pricing rule not found"
      });
    }

    rule.isActive = !rule.isActive;

    await rule.save();

    res.status(200).json({
      success: true,
      message: `Pricing rule ${
        rule.isActive ? "activated" : "deactivated"
      } successfully`,
      data: rule
    });
  } catch (error) {
    console.error(
      "Toggle pricing rule error:",
      error.message
    );

    res.status(500).json({
      success: false,
      message: "Failed to update pricing rule"
    });
  }
};