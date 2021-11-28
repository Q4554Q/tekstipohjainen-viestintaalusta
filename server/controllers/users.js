const Users = require('../model/users')
const bcrypt = require('bcrypt')
const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')

const getAll = async (req, res) => {
	const users = await Users.getAll()
	res.json(users)
}

const getById = async (req, res) => {
	const user = await Users.getById(req.params.id)
	if (user)
		res.json(user)
	res.status(404).end()
}

const create = async (req, res) => {
	const { username, password } = req.body
	const passwordHash = await bcrypt.hash(password, 10)

	const newUser = {
		username,
		passwordHash,
	}
	const createdUser = await Users.create(newUser)
	res.status(201).json(createdUser)
}

const validatedCreate = [
	check('username')
		.isLength({ min: 3 }).withMessage('The username must have at least 3 characters'),
	check('password')
		.isLength({ min: 6 }).withMessage('The password must have at least 6 characters')
		.matches(/[a-z]+/).withMessage('The password must include a lowercase letter')
		.matches(/[A-Z]+/).withMessage('The password must include an uppercase letter')
		.matches(/\d/).withMessage('The password must include a number'),
	validationHandler,
	create,
]

module.exports = {
	getAll,
	getById,
	create: validatedCreate,
}