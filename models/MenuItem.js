const mongoose = require('mongoose')


const menuSchema = new mongoose.Schema({
    name : {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    }
}, {
    collection: "menuItems"
})

module.exports = mongoose.model('MenuItem', menuSchema)