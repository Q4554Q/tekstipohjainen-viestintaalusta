const router = require('express').Router()
const messagesController = require('../controllers/messages')
const userExtractor = require('../middleware/userExtractor')

router
	.post('/:id', userExtractor, messagesController.vote)

module.exports = router