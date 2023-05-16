const mongoose = require('mongoose')
const carts = require('../Models/cartModel.js')
const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        desc: { type: String },
        discount: { type: Number },

    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('Product', productSchema);