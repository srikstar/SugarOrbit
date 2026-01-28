const express = require('express')
const Products = require('../models/Products/Products.js')

const products = express.Router()

products.post('/add-sweets', async (req, res) => {
    try {
        const newProduct = new Products(req.body)
        const savedProduct = await newProduct.save()

        console.log('Product Added')

        res.status(201).json({
            success: true,
            message: 'Product added successfully',
            data: savedProduct
        })
    } catch (error) {
        console.error('Error:', error)

        res.status(500).json({
            success: false,
            message: 'Failed to add product',
            error: error.message
        })
    }
})

products.get('/sweets', async (req, res) => {
    try {
        const sweets = await Products.find({ productCategory: 'sweets' })
        return res.status(200).json({
            message: 'Sweets fetched!',
            sweets: sweets
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to add product',
            error: error.message
        })
    }
})


module.exports = products
