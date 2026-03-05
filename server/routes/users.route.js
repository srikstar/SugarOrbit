const express = require('express')
const validator = require('validator');
const Users = require('../models/users.db.js')

const userRoute = express.Router()


// Profile GET
userRoute.get('/get-user/:phoneno', async(req,res) => {
  try {
    const user = await Users.find({phoneno : req.params.phoneno})
    return res.status(200).json({message : 'Fetched', data:user})
  } catch (error) {
    return res.status(400).json(
      { message : "No account found! did you mean to sign up?",
        isLoggedIn: false
      }
    )
  }
})

// Profile EDIT
userRoute.post('/edit-user', async (req, res) => {
  try {
    const {name, email, phoneno} = req.body;

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