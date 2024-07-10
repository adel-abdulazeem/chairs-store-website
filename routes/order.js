const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')


//Admin feature to add menu items to website 
router.get('/', orderController.getOrder)
router.post('/submitOrder', orderController.submitOrder)
module.exports = router 