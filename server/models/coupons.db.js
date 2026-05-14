const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: /^[A-Z0-9_-]+$/,
    },

    type: {
      type: String,
      required: true,
      enum: ["PERCENTAGE", "FLAT"],
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
      max: 100000,
    },

    minimumOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
      max: 1000000,
    },

    maximumDiscount: {
      type: Number,
      default: null,
      min: 0,
      max: 1000000,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    usageLimit: {
      type: Number,
      default: 0,
      min: 0,
      max: 1000000,
    },

    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    excludedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

couponSchema.pre("save", async function () {

  if (this.code) {
    this.code = this.code
      .replace(/[^\w-]/g, "")
      .toUpperCase()
      .trim();
  }

});

couponSchema.statics.findValidCoupon = async function (couponCode) {

  if (typeof couponCode !== "string") {
    throw new Error("Invalid coupon code");
  }

  const sanitizedCode = couponCode
    .replace(/[^\w-]/g, "")
    .toUpperCase()
    .trim();

  return await this.findOne({
    code: sanitizedCode,
    isActive: true,
  });
};

const Coupon = mongoose.model("Coupons", couponSchema);

module.exports = Coupon;