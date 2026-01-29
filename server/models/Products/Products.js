const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    productType: {
        type: String,
        required: [true, 'Product type is required'],
        enum: {
            values: ['sweets', 'namkeens', 'chocolates', 'gifting', 'snacks'],
            message: 'Product type must be sweets, namkeens, chocolates, gifting, or snacks'
        },
        trim: true,
        lowercase: true
    },
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        minlength: [3, 'Product name must be at least 3 characters'],
        maxlength: [100, 'Product name cannot exceed 100 characters'],
        trim: true,
        lowercase: true,
        match: [/^[a-z\s]+$/i, 'Product name should only contain letters and spaces']
    },
    productDescription: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [500, 'Description cannot exceed 500 characters'],
        trim: true
    },
    productWeight: {
        type: [
            {
                weight: {
                    type: String,
                    required: [true, 'Weight is required'],
                    enum: {
                        values: ['250g', '500g', '1kg'],
                        message: 'Weight must be 250g, 500g, 1kg'
                    }
                },
                _id: false
            }
        ],
        required: [true, 'At least one weight option is required'],
        validate: {
            validator: function (weights) {
                return Array.isArray(weights) && weights.length > 0;
            },
            message: 'Must have at least one weight option'
        }
    },
    productPrice: {
        type: [
            {
                price: {
                    type: Number,
                    required: [true, 'Price is required'],

                },
                _id: false
            }
        ],
        required: [true, 'At least one price option is required'],
        validate: {
            validator: function (prices) {
                return Array.isArray(prices) && prices.length > 0;
            },
            message: 'Must have at least one price option'
        }
    },
    productCategory: {
        type: String,
        required: [true, 'Product category is required'],
        lowercase: true,
        trim: true
    },
    productNetWeight: {
        type: String,
        required: [true, 'Net weight is required'],
        trim: true,
        match: [/^\d+(g|kg)$/, 'Net weight must be in format like 250g or 1kg']
    },
    productShelfLife: {
        type: String,
        required: [true, 'Shelf life is required'],
        minlength: [3, 'Shelf life description too short'],
        maxlength: [50, 'Shelf life description too long'],
        trim: true
    },
    productIngredients: {
        type: [
            {
                type: String,
                trim: true,
                minlength: [2, 'Each ingredient must be at least 2 characters'],
                maxlength: [50, 'Each ingredient cannot exceed 50 characters']
            }
        ],
        required: [true, 'At least one ingredient is required'],
        validate: {
            validator: function (ingredients) {
                return Array.isArray(ingredients) && ingredients.length > 0;
            },
            message: 'Must have at least one ingredient'
        }
    },
    productBadge: {
        type: String,
        required: [true, `Please specify whether the product is either veg or non-veg`],
        enum: {
            values: ['veg', 'non-veg'],
            message: `Please specify whether the product is either veg or non-veg`
        },
        lowercase: true,
        trim: true
    },
    productStock: {
        type: Boolean,
        required: [true, 'Please specify true or false if the product is in-stock or unavailable'],
        validate: {
            validator: function (stock) {
                return typeof stock === 'boolean';
            },
            message: 'Product stock must be true (in-stock) or false (unavailable)'
        }
    },
    productImages: {
        type: [String],
        required: [true, 'At least one image is required'],
        validate: {
            validator: function (images) {
                return (
                    Array.isArray(images) &&
                    images.length > 0 &&
                    images.every(img => validator.isURL(img))
                );
            },
            message: 'All images must be valid URLs'
        }
    },
    productTotalOrders: {
        type: Number,
        default: 0
    }
}, { timestamps: true, strict: true, strictQuery: true });


productSchema.index({ productName: 1 });
productSchema.index({ productType: 1 });
productSchema.index({ productCategory: 1 });
productSchema.index({ createdAt: -1 });

productSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
});


const Products = mongoose.model('Products', productSchema);
module.exports = Products;