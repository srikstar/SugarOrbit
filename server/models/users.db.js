const mongoose = require('mongoose');
const validator = require('validator');

const addressSchema = new mongoose.Schema(
  {
    building: {
      type: String,
      trim: true,
      maxlength: 100,
      default: ''           // flat no., house no., building name
    },
    street: {
      type: String,
      trim: true,
      maxlength: 100,
      default: ''           // street, area, locality
    },
    city: {
      type: String,
      trim: true,
      maxlength: 50,
      default: ''
    },
    state: {
      type: String,
      trim: true,
      maxlength: 50,
      default: ''
    },
    pincode: {
      type: String,
      trim: true,
      validate: {
        validator: (v) => v === '' || /^[1-9][0-9]{5}$/.test(v),
        message: 'Invalid pincode'
      },
      default: ''
    },
    country: {
      type: String,
      trim: true,
      maxlength: 50,
      default: 'India'
    }
  },
  { _id: false }            // no separate _id for the subdocument
)

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
        validator: (value) => validator.isEmail(value),
        message: 'Invalid email format'
      }
    },

    phoneno: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => /^\+91[0-9]{10}$/.test(value),
        message: 'Invalid phone number'
      }
    },

    address: {
      type: addressSchema,
      default: () => ({})   // initialises all sub-fields to their own defaults
    },

    orders: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Orders',
      default: []
    }
  },
  { timestamps: true }
);

userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.__v;
    return ret;
  }
});

const Users = mongoose.model('Users', userSchema);
module.exports = Users;