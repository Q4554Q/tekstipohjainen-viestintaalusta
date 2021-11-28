const Threads = require('../model/threads')
// const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')

const getAll = async (req, res) => {
	const threads = await Threads.getAll()
	// Construct the response object
	res.json(threads)
}

const getById = async (req, res) => {
	const thread = await Threads.getById(req.params.id)
	// Construct the response object
	if (thread)
		res.json(thread)
	res.status(404).end()
}

const create = async (req, res) => {
	// const { message } = req.body

	// Create a new thread
	// Create a new message
	// Construct the response object
	// res.status(201).json(createdThread)
}

const addMessage = async (req, res) => {
	// Lisää uuden viestin annettuun viestiketjuun
	return undefined
}

const validatedCreate = [
	// check('username')
	// 	.exists()
	// 	.isLength({ min: 3 })
	// 	.withMessage('The username must have at least 3 characters'),
	validationHandler,
	create,
]

const validatedAddMessage = [
	// check('username')
	// 	.exists()
	// 	.isLength({ min: 3 })
	// 	.withMessage('The username must have at least 3 characters'),
	validationHandler,
	addMessage,
]

module.exports = {
	getAll,
	getById,
	create: validatedCreate,
	addMessage: validatedAddMessage,
}