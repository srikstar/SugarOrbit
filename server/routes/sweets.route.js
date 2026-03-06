const express = require('express')
const Sweets = require('../models/sweets.db.js')

const sweetsRoute = express.Router()

// ADD
sweetsRoute.post('/add/sweets', async (req, res) => {
    try {

        const sweets = await Sweets.insertMany(req.body)

        return res.status(200).json({
            message: 'Sweets added successfully',
            count: sweets.length
        })

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
})


// GET



// DELETE



// UPDATE


module.exports = sweetsRoute