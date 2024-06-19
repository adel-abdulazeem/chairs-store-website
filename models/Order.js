const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'CartItems' }],

    phoneNo: {
        type: String,
        required: true
    },
    itemsCount: {
        type: Number, 
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