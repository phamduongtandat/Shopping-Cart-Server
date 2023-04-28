const mongoose = require('mongoose')




const cartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            prodID: {
                type: String,
                ref: 'Product',
                //strictPopulate: false
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],

}, { timestamp: true })
module.exports = mongoose.model('Cart', cartSchema)


