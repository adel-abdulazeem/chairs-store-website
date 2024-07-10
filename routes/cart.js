const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { ensureAuth } = require('../middleware/auth')


router.get('/',  cartController.getCartItems)
//Admin feature to add menu items to website 
router.post('/addToCart/:name', ensureAuth, cartController.addToCart)
router.get('/submitOrder', cartController.getOrder)
router.put('/increment/:id', cartController.incrementItem)
router.put('/delete/:id', cartController.decreaseItem)
router.delete('/deleteBtn/:id', cartController.deleteItem)

module.exports = router 

