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

    userId: {
        type: String,
        required: true
      },
      //makes add and plus work adn adding it
}, {
    collection: "cartItems"
})

module.exports = mongoose.model('CartItem', cartSchema)