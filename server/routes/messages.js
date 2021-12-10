const router = require('express').Router()
const messagesController = require('../controllers/messages')
const userExtractor = require('../middleware/userExtractor')

router
	.post('/:id', userExtractor, messagesController.vote)
	.delete('/:id', userExtractor, messagesController.remove)

module.exports = router