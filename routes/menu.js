const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')



router.get('/', menuController.getMenu)
router.get('/insert', menuController.createItem)
const countController = require('../controllers/cartCount');
router.use(countController.computeCartItemCount);

module.exports = router