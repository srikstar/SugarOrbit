const express = require('express')
const Chocolates = require('../models/chocolates.db.js')

const chocolatesRoute = express.Router()

// ADD
chocolatesRoute.post('/add/chocolates', async (req, res) => {
    try {
        if (!Array.isArray(req.body)) {
            return res.status(400).json({
                message: 'Request body must be an array'
            });
        }

        const chocolates = await Chocolates.insertMany(req.body, { ordered: false });

        return res.status(201).json({
            message: 'Chocolates added successfully',
            count: chocolates.length
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
});

// GET
chocolatesRoute.get('/chocolates', async (req, res) => {
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

        const pageNum = Math.max(1, Number(page))
        const limitNum = Math.max(1, Number(limit))
        const skip = (pageNum - 1) * limitNum

        const [chocolates, total, productTypes, maxPriceResult] = await Promise.all([
            Chocolates.find(filter).skip(skip).limit(limitNum),
            Chocolates.countDocuments(filter),
            Chocolates.distinct('productType'),
            Chocolates.aggregate([
                { $unwind: '$productPrice' },
                { $group: { _id: null, maxPrice: { $max: '$productPrice.price' } } }
            ])
        ])

        const resolvedMaxPrice = maxPriceResult[0]?.maxPrice ?? 10000

        return res.status(200).json({
            message: 'All Chocolates fetched',
            data: chocolates,
            productType: productTypes,
            maxPrice: resolvedMaxPrice,
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

// GET SPECIFIC NAMKEENS DATA
chocolatesRoute.get('/chocolates/:id', async (req, res) => {
    try {
        const chocolate = await Chocolates.findOne({ _id: req.params.id })

        if (!chocolate) return res.status(404).json({ message: "Requested Chocolates not found!" })

        return res.status(200).json({ chocolate })

    } catch (error) {
        return res.status(500).json({ message: "Unable to get the request at this time" })
    }
})


// DELETE



// UPDATE


module.exports = chocolatesRoute