const router = require('express').Router()
const usersController = require('../controllers/users')
const userExtractor = require('../middleware/userExtractor')

router
	.get('/me', userExtractor, usersController.getMyProfile)
	.get('/', userExtractor, usersController.getAll)
	.post('/', usersController.create)

module.exports = router