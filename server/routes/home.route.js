const express = require('express')
const Sweets = require('../models/sweets.db.js')
const Namkeens = require('../models/namkeens.db.js')

const homeRoute = express.Router()

// GET TOP 5 SWEETS
homeRoute.get('/sweets', async (req, res) => {
    try {
        const sweets = await Sweets.find({},{productName : 1, productDescription : 1,productPrice: 1, totalOrders : 1, _id : 1, productImages : { $slice : 1 } })
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
        const namkeens = await Namkeens.find({},{productName : 1, productDescription : 1,productPrice: 1, totalOrders : 1, _id : 1, productImages : { $slice : 1 } })
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


// GET PARTICULAR SWEET
homeRoute.get('/:type/:name', async (req, res) => {
    try {
        const { type, name } = req.params

        let Model

        if (type === 'sweets') Model = Sweets
        else if (type === 'namkeens') Model = Namkeens
        else if (type === 'chocolates') Model = Chocolates
        else {
            return res.status(400).json({ message: 'Invalid type' })
        }

        const product = await Model.findOne({ name })

        if (!product) {
            return res.status(404).json({ message: 'Not found' })
        }

        res.json(product)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = homeRoute