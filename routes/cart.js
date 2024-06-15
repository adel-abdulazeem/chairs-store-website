const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const { ensureAuth } = require('../middleware/auth')



router.get('/', ensureAuth, cartController.getCartItems)

const countController = require('../controllers/cartCount');
router.use(countController.computeCartItemCount);

//Admin feature to add menu items to website 
router.post('/addToCart/:name', ensureAuth, cartController.addToCart)
router.get('/checkout', cartController.getOrder)
router.post('/increment/:name', cartController.incrementItem)
router.delete('/delete/:id', cartController.deleteCartItem)
router.delete('/deleteBtn/:name', cartController.deleteItem)

module.exports = router 

