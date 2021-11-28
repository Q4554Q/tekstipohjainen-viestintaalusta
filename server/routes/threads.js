const router = require('express').Router()
const threadsController = require('../controllers/threads')
// const userExtractor = require('../middleware/userExtractor')

router
	.get('/:id', threadsController.getById)
	.get('/', threadsController.getAll)
	.post('/:id', threadsController.create)
	.post('/', threadsController.create)

module.exports = router