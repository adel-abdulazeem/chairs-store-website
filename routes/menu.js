const express = require('express')
const router = express.Router()
const menuController = require('../controllers/menu')


router.get('/', menuController.getMenu)
router.get('/insert', menuController.createItem)

module.exports = router