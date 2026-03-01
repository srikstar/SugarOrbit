const express = require('express')
const validator = require('validator');
const Users = require('../models/users.db.js')

const userRoute = express.Router()


// Profile Edit
userRoute.post('/edit-user', async (req, res) => {
  try {
    const {name, email, phoneno} = req.body;

    if (!phoneno || typeof phoneno !== 'string' || !/^[0-9]{10}$/.test(phoneno)) {
      return res.status(400).json({
        message: 'Invalid phone number',
        isAuth: false
      });
    }

    const user = await Users.findOne({ phoneno }).select('+email');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        isAuth: false
      });
    }

    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          message: 'Invalid email format',
          isAuth: true
        });
      }

      const existingEmail = await Users.findOne({ email: email.toLowerCase() });
      if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          message: 'Email already in use',
          isAuth: true
        });
      }

      user.email = email.toLowerCase().trim();
    }

    if (name) {
      if (typeof name !== 'string' || name.length < 2 || name.length > 50) {
        return res.status(400).json({
          message: 'Invalid name',
          isAuth: true
        });
      }
      user.name = name.trim();
    }

    await user.save();

    return res.status(200).json({
      message: 'User updated successfully',
      isAuth: true,
      isSuccess: true
    });

  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      isAuth: false,
      isSuccess: false
    });
  }
});


module.exports = userRoute