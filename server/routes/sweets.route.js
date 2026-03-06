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
        const {
            page = 1,
            limit = 10,
            productType = '',
            minPrice = 0,
            maxPrice = 10000
        } = req.query
        const filter = {}

        if (productType && productType.length > 0) {
            const types = Array.isArray(productType)
                ? productType
                : productType.split(',')

            filter.productType = { $in: types }
        }


        if (minPrice || maxPrice) {
            filter['productPrice.price'] = {
                $gte: Number(minPrice),
                $lte: Number(maxPrice)
            }
        }

        // ── Pagination ────────────────────────────────────────
        const pageNum = Math.max(1, Number(page))
        const limitNum = Math.max(1, Number(limit))
        const skip = (pageNum - 1) * limitNum

        // ── Query ─────────────────────────────────────────────
        const [sweets, total] = await Promise.all([
            Sweets.find(filter).skip(skip).limit(limitNum),
            Sweets.countDocuments(filter)           // total for frontend pagination
        ])

        return res.status(200).json({
            message: 'All sweets fetched',
            data: sweets,
            pagination: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
                hasNext: pageNum < Math.ceil(total / limitNum),
                hasPrev: pageNum > 1
            }
        })

    } catch (error) {
        return res.status(400).json({
            message: error?.message
        })
    }
})



// DELETE



// UPDATE


module.exports = sweetsRoute