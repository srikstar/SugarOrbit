const express = require('express')
const Namkeens = require('../models/namkeens.db.js')

const namkeensRoute = express.Router()

// ADD
namkeensRoute.post('/add/namkeens', async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400).json({
        message: 'Request body must be an array'
      });
    }
    
    const namkeens = await Namkeens.insertMany(req.body, { ordered: false });

    return res.status(201).json({
      message: 'Namkeens added successfully',
      count: namkeens.length
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

// GET
namkeensRoute.get('/namkeens', async (req, res) => {
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
        const [namkeens, total] = await Promise.all([
            Namkeens.find(filter).skip(skip).limit(limitNum),
            Namkeens.countDocuments(filter)           // total for frontend pagination
        ])

        return res.status(200).json({
            message: 'All Namkeens fetched',
            data: namkeens,
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


module.exports = namkeensRoute