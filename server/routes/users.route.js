const express = require('express')
const validator = require('validator');
const Users = require('../models/users.db.js')
const verifyFirebaseToken = require('../middleware/auth.middleware.js')

const userRoute = express.Router()


// Profile GET
userRoute.get('/get-user/:phoneno', async (req, res) => {
  try {

    const user = await Users.findOne({ phoneno: req.params.phoneno }).select('-_id -createdAt -updatedAt')

    if (!user) {
      return res.status(404).json({
        message: "No account found! Did you mean to sign up?",
        isLoggedIn: false
      })
    }

    return res.status(200).json({
      message: "Fetched",
      isLoggedIn: true,
      data: user
    })

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message
    })
  }
})

// Profile EDIT
userRoute.post('/edit-user', verifyFirebaseToken, async (req, res) => {
  try {
    const { name, email, phoneno } = req.body;

    if (!phoneno || typeof phoneno !== 'string' || !/^[0-9]{10}$/.test(phoneno)) {
      return res.status(400).json({
        message: 'Invalid phone number',
        isLoggedIn: false
      });
    }

    const user = await Users.findOne({ phoneno }).select('+email');
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        isLoggedIn: false
      });
    }

    if (email) {
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          message: 'Invalid email format',
          isLoggedIn: true
        });
      }

      const existingEmail = await Users.findOne({ email: email.toLowerCase() });
      if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
        return res.status(400).json({
          message: 'Email already in use',
          isLoggedIn: true
        });
      }

      user.email = email.toLowerCase().trim();
    }

    if (name) {
      if (typeof name !== 'string' || name.length < 2 || name.length > 50) {
        return res.status(400).json({
          message: 'Invalid name',
          isLoggedIn: true
        });
      }
      user.name = name.trim();
    }

    await user.save();

    return res.status(200).json({
      message: 'User updated successfully',
      isLoggedIn: true,
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

// Profile ADD



module.exports = userRoute