const express = require('express')
const Sweets = require('../models/sweets.db.js')
const Namkeens = require('../models/namkeens.db.js')

const homeRoute = express.Router()

// GET TOP 5 SWEETS
homeRoute.get('/sweets', async (req, res) => {
    try {
        const sweets = await Sweets.find()
            .sort({ totalOrders: -1 })
            .limit(5)

        res.status(200).json({
            data: sweets,
            message: "Sweets fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

// GET TOP 5 NAMKEENS
homeRoute.get('/namkeens', async (req, res) => {
    try {
        const namkeens = await Namkeens.find()
            .sort({ totalOrders: -1 })
            .limit(5)

        res.status(200).json({
            data: namkeens,
            message: "Namkeens fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = homeRoute