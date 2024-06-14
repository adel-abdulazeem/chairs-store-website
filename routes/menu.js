const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')

const countController = require('../controllers/cartCount');
router.use(countController.computeCartItemCount);

router.get('/', menuController.getMenu)
router.get('/insert', menuController.createItem)


module.exports = router