const router = require('express').Router()
const usersController = require('../controllers/users')
const userExtractor = require('../middleware/userExtractor')

router
	.get('/:id', userExtractor, usersController.getById)
	.get('/', userExtractor, usersController.getAll)
	.post('/', usersController.create)

module.exports = router