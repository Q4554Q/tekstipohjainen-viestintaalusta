const router = require('express').Router()
const usersController = require('../controllers/users')

router
	.get('/:id', usersController.getById)
	.get('/', usersController.getAll)
	.post('/', usersController.create)

module.exports = router