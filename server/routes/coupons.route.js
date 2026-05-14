const express = require('express')
const Coupon = require('../models/coupons.db.js')

const couponRoute = express.Router();

couponRoute.post("/add", async (req, res) => {
  try {

    let {
      code,
      type,
      discountValue,
      minimumOrderAmount,
      maximumDiscount,
      expiryDate,
      usageLimit,
      excludedProducts,
    } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ success: false, message: "Coupon code is required" });
    }

    if (!["PERCENTAGE", "FLAT"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid coupon type" });
    }

    if (typeof discountValue !== "number" || discountValue <= 0) {
      return res.status(400).json({ success: false, message: "Invalid discount value" });
    }

    if (!expiryDate) {
      return res.status(400).json({ success: false, message: "Expiry date is required" });
    }

    code = code.replace(/[^\w-]/g, "").toUpperCase().trim();

    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(400).json({ success: false, message: "Coupon already exists" });
    }

    const coupon = await Coupon.create({
      code,
      type,
      discountValue,
      minimumOrderAmount: minimumOrderAmount || 0,
      maximumDiscount: maximumDiscount || null,
      expiryDate,
      usageLimit: usageLimit || 0,
      excludedProducts: excludedProducts || [],
    });

    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      coupon,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

couponRoute.post("/apply", async (req, res) => {
  try {

    let { couponCode, cartTotal } = req.body;

    if (!couponCode || typeof couponCode !== "string") {
      return res.status(400).json({ success: false, message: "Invalid coupon code" });
    }

    if (cartTotal === undefined || typeof cartTotal !== "number") {
      return res.status(400).json({ success: false, message: "Invalid cart total" });
    }

    couponCode = couponCode.replace(/[^\w-]/g, "").toUpperCase().trim();

    const coupon = await Coupon.findOne({
      code: couponCode,
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    if (new Date() > coupon.expiryDate) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }

    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: "Coupon usage limit exceeded" });
    }

    if (cartTotal < coupon.minimumOrderAmount) {
      return res.status(400).json({
        success: false,
        message: `Minimum order amount should be ₹${coupon.minimumOrderAmount}`,
      });
    }

    let discount = 0;

    if (coupon.type === "PERCENTAGE") {
      discount = (cartTotal * coupon.discountValue) / 100;

      if (coupon.maximumDiscount && discount > coupon.maximumDiscount) {
        discount = coupon.maximumDiscount;
      }

    } else if (coupon.type === "FLAT") {
      discount = coupon.discountValue;
    }

    const finalAmount = Math.max(cartTotal - discount, 0);

    return res.status(200).json({
      success: true,
      coupon: {
        _id: coupon._id,
        code: coupon.code,
        type: coupon.type,
        discountValue: coupon.discountValue,
      },
      cartTotal,
      discount,
      finalAmount,
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = couponRoute;