const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const cartSchema = new mongoose.Schema({
    name : {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    }, {
    collection: "cartItems"
})

module.exports = mongoose.model('CartItems', cartSchema)