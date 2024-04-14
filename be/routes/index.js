const express = require('express')
const router = express.Router()

const homeController = require('../controllers/homeController');

router.get('/', function(req, res, next) {
  res.json({ message: 'hello world' })
})

router.get('/list', homeController.itemList)
router.post('/insert', homeController.itemInsert)

module.exports = router
