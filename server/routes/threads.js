const router = require('express').Router()
const threadsController = require('../controllers/threads')
const userExtractor = require('../middleware/userExtractor')

router
	.get('/:id', userExtractor, threadsController.getById)
	.get('/', userExtractor, threadsController.getAll)
	.post('/:id', userExtractor, threadsController.addMessage)
	.post('/', userExtractor, threadsController.create)

module.exports = router