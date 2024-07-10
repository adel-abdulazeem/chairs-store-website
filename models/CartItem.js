const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const cartSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true

    },
    count: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
      },
      //makes add and plus work adn adding it
}, {
    collection: "cartItems"
})

module.exports = mongoose.model('CartItem', cartSchema)