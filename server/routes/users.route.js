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
// POST /api/users/edit-user/:phoneno
userRoute.post('/edit-user/:phoneno', verifyFirebaseToken, async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const phone = req.params.phoneno;

    if (!phone || !/^\+91[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number', isLoggedIn: false });
    }

    const user = await Users.findOne({ phoneno: phone }).select('-orders');
    if (!user) {
      return res.status(404).json({ message: 'User not found', isLoggedIn: false });
    }

    const updates = {};

    // ── name ──────────────────────────────────────────────────────────────────
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
        return res.status(400).json({ message: 'Invalid name', isLoggedIn: true });
      }
      updates.name = name.trim();
    }

    // ── email ─────────────────────────────────────────────────────────────────
    if (email !== undefined) {
      const newEmail = email.toLowerCase().trim();
      if (!validator.isEmail(newEmail)) {
        return res.status(400).json({ message: 'Invalid email format', isLoggedIn: true });
      }
      if (newEmail !== user.email) {
        const existingEmail = await Users.findOne({ email: newEmail }).select('_id');
        if (existingEmail && existingEmail._id.toString() !== user._id.toString()) {
          return res.status(400).json({ message: 'Email already in use', isLoggedIn: true });
        }
        updates.email = newEmail;
      }
    }

    // ── address ───────────────────────────────────────────────────────────────
    // FIX: set the entire address object at once instead of dot-notation fields.
    // Dot-notation fails when the existing field value is a plain string (old data).
    if (address !== undefined) {
      const { building = '', street = '', city = '', state = '', pincode = '', country = 'India' } = address;

      if (!city.trim()) {
        return res.status(400).json({ message: 'City is required', isLoggedIn: true });
      }
      if (pincode && !/^[1-9][0-9]{5}$/.test(pincode.trim())) {
        return res.status(400).json({ message: 'Enter a valid 6-digit pincode', isLoggedIn: true });
      }

      updates.address = {
        building: building.trim(),
        street:   street.trim(),
        city:     city.trim(),
        state:    state.trim(),
        pincode:  pincode.trim(),
        country:  country.trim() || 'India',
      };
    }

    await Users.updateOne({ phoneno: phone }, { $set: updates });

    return res.status(200).json({ message: 'User updated successfully', isLoggedIn: true, isSuccess: true });

  } catch (error) {
    console.error('edit-user error:', error.message, error);
    return res.status(500).json({ message: 'Internal server error', isSuccess: false });
  }
});

// Profile ADD
userRoute.post('/register', verifyFirebaseToken, async (req, res) => {
  try {
    const { name, email, phoneno } = req.body;
 
    if (!phoneno || !/^\+91[0-9]{10}$/.test(phoneno)) {
      return res.status(400).json({ message: 'Invalid phone number', isSuccess: false });
    }
 
    if (!name || typeof name !== 'string' || name.length < 2 || name.length > 50) {
      return res.status(400).json({ message: 'Invalid name', isSuccess: false });
    }
 
    const cleanEmail = email?.toLowerCase().trim();
    if (!cleanEmail || !validator.isEmail(cleanEmail)) {
      return res.status(400).json({ message: 'Invalid email format', isSuccess: false });
    }
 
    // Prevent duplicate registrations
    const existingPhone = await Users.findOne({ phoneno });
    if (existingPhone) {
      return res.status(409).json({ message: 'Account already exists. Please log in.', isSuccess: false });
    }
 
    const existingEmail = await Users.findOne({ email: cleanEmail });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already in use', isSuccess: false });
    }
 
    const newUser = new Users({
      name:    name.trim(),
      email:   cleanEmail,
      phoneno: phoneno
    });
 
    await newUser.save();
 
    return res.status(201).json({ message: 'Account created successfully', isSuccess: true });
 
  } catch (error) {
    console.error('register error:', error.message, error);
    return res.status(500).json({ message: 'Internal server error', isSuccess: false });
  }
});



module.exports = userRoute