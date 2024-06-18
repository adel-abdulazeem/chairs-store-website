const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { ensureAuth } = require('../middleware/auth')


router.get('/',  cartController.getCartItems)
//Admin feature to add menu items to website 
router.post('/addToCart/:name', ensureAuth, cartController.addToCart)
router.get('/submitOrder', cartController.getOrder)
router.post('/increment/:name', cartController.incrementItem)
router.delete('/delete/:id', cartController.deleteCartItem)
router.delete('/deleteBtn/:name', cartController.deleteItem)

module.exports = router 

