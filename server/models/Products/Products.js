const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        minlength: [3, 'Product name must be at least 3 characters'],
        maxlength: [100, 'Product name cannot exceed 100 characters'],
        lowercase: true
    },
    productImage: {
        type: [String],
        required: [true, 'At least one image is required'],
        validate: {
            validator: function(images) {
                return images.length > 0 && images.every(img => validator.isURL(img));
            },
            message: 'All images must be valid URLs'
        }
    },
    productDescription: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [10, 'Description must be at least 10 characters'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    productPrice: {
        type: [
            {
                weight: {
                    type: String,
                    required: [true, 'Weight is required'],
                    enum: {
                        values: ['250g', '500g', '1kg'],
                        message: 'Weight must be 250g, 500g, or 1kg'
                    }
                },
                price: {
                    type: Number,
                    required: [true, 'Price is required'],
                    min: [0, 'Price cannot be negative'],
                    max: [999999, 'Price is too high']
                }
            }
        ],
        required: [true, 'At least one price option is required'],
        validate: {
            validator: function(prices) {
                return prices.length > 0;
            },
            message: 'Must have at least one price option'
        }
    },
    productSpecification: {
        netWeight: {
            type: String,
            required: [true, 'Net weight is required'],
            trim: true,
            match: [/^\d+(g|kg)$/, 'Net weight must be in format like 250g or 1kg']
        },
        productType: {
            type: String,
            required: [true, 'Product type is required'],
            enum: {
                values: ['veg', 'non-veg'],
                message: 'Product type must be either veg or non-veg'
            }
        },
        shelfLife: {
            type: String,
            required: [true, 'Shelf life is required'],
            trim: true,
            minlength: [3, 'Shelf life description too short'],
            maxlength: [50, 'Shelf life description too long']
        }
    },
    productContent: {
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
            validator: function(content) {
                return content.length > 0;
            },
            message: 'Must have at least one ingredient'
        }
    },
    productType: {
        type: String,
        required: [true, 'Product type is required'],
        enum: {
            values: ['veg', 'non-veg'],
            message: 'Product type must be either veg or non-veg'
        }
    },
    productTotalOrders: {
        type: Number,
        required: [true, 'Total orders is required'],
        default: 0,
        min: [0, 'Total orders cannot be negative'],
        max: [10000000, 'Total orders value too high']
    },
    productBadges: {
        type: [String],
        enum: {
            values: ['Sulphur-free Process', 'Trans Fat-free Oil', '100% Vegetarian', 'Eggless', 'Freshly Baked', 'Handcrafted'],
            message: 'Invalid badge: {VALUE}'
        },
        default: []
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        default: 0,
        min: [0, 'Stock cannot be negative'],
        max: [1000000, 'Stock value too high']
    }
}, { 
    timestamps: true,
    strict: true
});

productSchema.index({ productName: 1 });
productSchema.index({ productType: 1 });

productSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.__v;
        return ret;
    }
});

const Products = mongoose.model('Products', productSchema);
module.exports = Products;