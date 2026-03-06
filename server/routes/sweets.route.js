const express = require('express')
const Sweets = require('../models/sweets.db.js')

const sweetsRoute = express.Router()

// ADD
sweetsRoute.post('/add/sweets', async (req, res) => {
    try {

        if (!Array.isArray(req.body)) {
            return res.status(400).json({
                message: 'Request body must be an array'
            })
        }

        const sweets = await Sweets.insertMany(req.body, { ordered: false })

        return res.status(201).json({
            message: 'Sweets added successfully',
            count: sweets.length
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
})

// GET
sweetsRoute.get('/sweets', async (req, res) => {
    try {
        const sweets = await Sweets.find()
        return res.status(200).json({
            message : 'All sweets fetched',
            data : sweets
        })
    } catch (error) {
        return res.status(400).json({
            message : error?.message
        })
    }
})



// DELETE



// UPDATE


module.exports = sweetsRoute