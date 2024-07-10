const express = require('express')
const router = express.Router()
const submitOrderController = require('../controllers/submitOrder')


//Admin feature to add menu items to website 
router.get('/', submitOrderController.getOrder)

router.put('/increment/:id', submitOrderController.incrementItem)
router.put('/delete/:id', submitOrderController.decreaseItem)
router.delete('/deleteBtn/:id', submitOrderController.deleteItem)
module.exports = router 