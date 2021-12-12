const Users = require('../model/users')
const Threads = require('../model/threads')
const bcrypt = require('bcrypt')
const { check, query } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')
const hideWriters = require('../utils/hideWriters')

/**
 * Responds with all the usernames and their scores.
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
	const users = await Users.getAll()
	res.json(users)
}

/**
 * Respond's with the logged in user's data, including all the threads they have participated in.
 * The threads can be paginated with query strings 'limit' and 'offset'.
 * @param {*} req
 * @param {*} res
 * @returns
 */
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

/**
 * Creates a new user with the username and password specified in the request body.
 * The password is hashed before stored into the database.
 * Responds with the created username and id.
 * @param {*} req
 * @param {*} res
 */
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

/**
 * Checks that the offset and limit query string parameters are positive integers.
 */
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

/**
 * Checks that the username is long enough and contains only letters and numbers.
 * Checks that the password contains at least 6 characters, a lowercase letter, an uppecase letter and a number.
 */
const validatedCreate = [
	check('username')
		.isLength({ min: 3 }).withMessage('The username must have at least 3 characters')
		.matches(/^[A-Za-z0-9\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]+$/).withMessage('The username must only contain letters and numbers'),
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