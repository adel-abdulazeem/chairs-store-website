const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    itemsCount: {
        type: Number, 
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
}, {
    collection: "orders"
})

module.exports = mongoose.model('Order', orderSchema)