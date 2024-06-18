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
        type: String, 
        required: true
    },
    total: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
}, {
    collection: "orders"
})

module.exports = mongoose.model('Order', orderSchema)