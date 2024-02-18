const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type:String, 
        trim: true,
        required: [true, "please provide a product name"],
        maxLength: [100, "name can't be longer than 100 characters"]
    },
    price: {
        type: Number,
        required: [true, "please provide a product price"],
        default: 0
    },
    description: {
        type: String,
        required: [true, "please provide a product description"],
        maxLength: [1000, "name can't be longer than 1000 characters"]
    },
    image:{
        type: String,
        default: '/uploads/example.jpeg'
    },
    category:{
        type: String,
        required: [true, "please provide a product category"],
        enum: ['office', 'kitchen', 'bedroom', 'living', 'misc']
    },
    company:{
        type: String,
        required: [true, "please provide a company"],
        enum: {
            values: ['ikea', 'liddy', 'marcos'],
            message: '{VALUE} is not supported'
        }
    },
    colors:{
        type: [String],
        default: ['#222'],
        required: true,
    },
    features:{
        type: Boolean,
        default: false,
        
    },
    freeShipping:{
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Number,
        required: true,
        default: 15
    },
    averageRating:{
        type: Number,
        default: 0
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }

},
{timestamps:true})

module.exports = mongoose.model('product', ProductSchema)