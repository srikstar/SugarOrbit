const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid email format"
      }
    },

    phoneno: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (value) {
          return /^[0-9]{10}$/.test(value);
        },
        message: "Invalid phone number"
      }
    },

    address: {
      type: String,
      trim: true,
      maxlength: 200,
      default: "Address not added"
    },

    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Orders",
      default: []
    }
  },
  {
    timestamps: true
  }
);

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.__v;
    return ret;
  }
});

const Users = mongoose.model("Users", userSchema);
module.exports = Users;