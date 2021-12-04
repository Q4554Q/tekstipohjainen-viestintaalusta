const Users = require('../model/users')
const Threads = require('../model/threads')
const bcrypt = require('bcrypt')
const { check, query } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')
const hideWriters = require('../utils/hideWriters')

const getAll = async (req, res) => {
	const users = await Users.getAll()
	res.json(users)
}

const getMyProfile = async (req, res) => {
	const userId = req.user.id
	const user = await Users.getById(userId)
	const offset = parseInt(req.query.offset || 0)
	const limit = parseInt(req.query.limit || 100)

	if (!user) {
		return res.status(404).json({ error: 'a user was not found with the given id' })
	}

	// Get all threads in which this user has posted
	const threads = await Threads.getAll(offset, limit, userId)
	threads.forEach(thread => {
		hideWriters(thread, req.user)
		thread.messages = thread.messages.slice(0, 1)
	})
	user.threads = threads.filter(thread => thread.yourWriterId > 0)

	res.json(user)
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

const validatedGetMyProfile = [
	query('offset')
		.isInt({ min: 0 })
		.optional()
		.withMessage('The pagination offset must be a positive integer'),
	query('limit')
		.isInt({ min: 0 })
		.optional()
		.withMessage('The pagination limit must be a positive integer'),
	validationHandler,
	getMyProfile,
]

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
	getMyProfile: validatedGetMyProfile,
	create: validatedCreate,
}