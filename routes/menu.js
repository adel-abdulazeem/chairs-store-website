const express = require('express')
const router = express.Router()
const countController = require('../controllers/cartCount');
const menuController = require('../controllers/menu')

router.use(countController.computeCartItemCount)

router.get('/', menuController.getMenu)
router.get('/insert', menuController.createItem)

module.exports = router