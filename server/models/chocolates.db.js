const mongoose = require('mongoose')

// PRICE
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

// REVIEWS
const reviewSchema = new mongoose.Schema(
    {
        stars: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        text: {
            type: String,
            required: true,
            trim: true,
            maxlength: [500, 'Review text must be under 500 characters']
        },
        author: {
            type: String,
            required: true,
            trim: true,
            maxlength: [100, 'Author name must be under 100 characters']
        },
        date: {
            type: String,
            required: true,
            trim: true
        }
    },
    { _id: false }
)

function deriveBadge(totalOrders) {
    if (totalOrders >= 200) return 'Bestseller'
    if (totalOrders > 50)  return 'Premium'
    return 'Freshly Made'
}

// SCHEMA
const chocolatesSchema = new mongoose.Schema(
    {
        _id: {
            type: String
        },
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
            required: [true, 'Product ingredients are required'],
            trim: true,
            minlength: [2, 'Product ingredients must be at least 2 characters'],
            maxlength: [100, 'Product ingredients must be under 100 characters']
        },
        productDescription: {
            type: String,
            required: [true, 'Product description is required'],
            trim: true,
            minlength: [2, 'Product description must be at least 2 characters'],
            maxlength: [300, 'Product description must be under 300 characters']
        },
        productPrice: {
            type: [priceSchema],
            required: [true, 'At least one price entry is required'],
            validate: {
                validator: (arr) => {
                    const sizes = arr.map(p => p.size)
                    return ['250g', '500g', '1KG'].every(s => sizes.includes(s))
                },
                message: 'Prices for all three sizes (250g, 500g, 1KG) are required'
            }
        },
        productType: {
            type: String,
            required: [true, 'Product type is required'],
            trim: true,
            minlength: [2, 'Product type must be at least 2 characters'],
            maxlength: [100, 'Product type must be under 100 characters']
        },

        // ACCORDION
        productDetails: {
            type: String,
            required: [true, 'Product details are required'],
            trim: true,
            maxlength: [1000, 'Product details must be under 1000 characters']
        },
        shippingInfo: {
            type: String,
            required: [true, 'Shipping & returns info is required'],
            trim: true,
            maxlength: [1000, 'Shipping info must be under 1000 characters']
        },
        faqContent: {
            type: String,
            required: [true, 'FAQ content is required'],
            trim: true,
            maxlength: [2000, 'FAQ content must be under 2000 characters']
        },

        // IMAGES
        productImages: {
            type: [String],
            required: [true, 'At least one image is required'],
            validate: {
                validator: (arr) => arr.length >= 1 && arr.length <= 5,
                message: 'Product must have between 1 and 5 images'
            }
        },

        // BADGE
        productBadge: {
            type: String,
            enum: ['Bestseller', 'Premium', 'Freshly Made'],
            default: 'Freshly Made'
        },

        // FEATURES
        shelfLifeDays: {
            type: Number,
            required: [true, 'Shelf life is required'],
            min: [1, 'Shelf life must be at least 1 day'],
            default: 60
        },

        // REVIEWS
        reviews: {
            type: [reviewSchema],
            default: []
        },
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        totalReviews: {
            type: Number,
            default: 0,
            min: 0
        },

        // ORDERS
        totalOrders: {
            type: Number,
            default: 0,
            min: [0, 'Total orders cannot be negative']
        },
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
)

chocolatesSchema.pre('save', function (next) {
    this.productBadge = deriveBadge(this.totalOrders)

    if (this.reviews && this.reviews.length > 0) {
        this.totalReviews = this.reviews.length
        const sum = this.reviews.reduce((acc, r) => acc + r.stars, 0)
        this.averageRating = Math.round((sum / this.totalReviews) * 10) / 10
    } else {
        this.totalReviews = 0
        this.averageRating = 0
    }

    next()
})

chocolatesSchema.pre('findOneAndUpdate', function (next) {
    const update = this.getUpdate()
    const incoming = update?.$set?.totalOrders ?? update?.totalOrders

    if (incoming !== undefined) {
        update.$set = update.$set || {}
        update.$set.productBadge = deriveBadge(incoming)
    }

    next()
})

chocolatesSchema.set('toJSON', {
    transform: (_doc, ret) => {
        delete ret.__v
        return ret
    }
})

const Chocolates = mongoose.model('Chocolates', chocolatesSchema)
module.exports = Chocolates