const mongoose = require('mongoose')
const validator = require('validator')

const priceSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            enum: ['250g', '500g', '1KG'],
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    },
    { _id: false }
)

const sweetSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, 'Product name is required'],
            unique: true,
            trim: true,
            minlength: [2, 'Product name must be at least 2 characters'],
            maxlength: [100, 'Product name must be under 100 characters']
        },
        productIngredients: {
            type: String,
            required: [true, 'Product Ingredients is required'],
            trim: true,
            minlength: [2, 'Product Ingredients must be at least 2 characters'],
            maxlength: [100, 'Product Ingredients must be under 100 characters']
        },
        productDescription: {
            type: String,
            required: [true, 'Product Description is required'],
            trim: true,
            minlength: [2, 'Product Description must be at least 2 characters'],
            maxlength: [40, 'Product Description must be under 100 characters']
        },
        productPrice: {
            type: [priceSchema],
            required: [true, 'At least one price entry is required'],
            validate: {
                validator: (arr) => {
                    const sizes = arr.map(p => p.size)
                    return ['250g', '500g', '1KG'].every(s => sizes.includes(s))
                },
                message: 'Prices for all sizes (250g, 500g, 1KG) are required'
            }
        },

        productType: {
            type: String,
            required: [true, 'Product type is required'],
            trim: true,
            enum: {
                values: ['Ganesh Chaturithi', 'Sweet Chikki', 'Sweet Dryfruits', 'Sweet Ghee Sweets', 'Sweet Laddus'],
                message: '{VALUE} is not a valid product type'
            }
        },

        productDetails: {
            type: String,
            required: [true, 'Product details are required'],
            trim: true,
            maxlength: [1000, 'Product details must be under 1000 characters']
        },

        productImages: {
            type: [String],
            required: [true, 'At least one image is required'],
            validate: {
                validator: (arr) => arr.length > 0 && arr.length <= 5,
                message: 'Product must have between 1 and 5 images'
            }
        },

        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

sweetSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v
        return ret
    }
})

const Sweets = mongoose.model('Sweets', sweetSchema)
module.exports = Sweets