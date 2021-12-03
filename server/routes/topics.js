const router = require('express').Router()
const topicsController = require('../controllers/topics')
const userExtractor = require('../middleware/userExtractor')

router
	.get('/', userExtractor, topicsController.getAll)

module.exports = router