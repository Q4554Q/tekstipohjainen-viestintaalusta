const Threads = require('../model/threads')
const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')

const getAll = async (req, res) => {
	const threads = await Threads.getAll()
	res.json(threads)
}

const getById = async (req, res) => {
	const thread = await Threads.getById(req.params.id)
	if (thread)
		res.json(thread)
	res.status(404).end()
}

const create = async (req, res) => {
	const user = req.user
	const { message } = req.body

	const newThread = {
		topicId: 1,	// Hardcoded topic for now
		writerId: user.id
	}
	const firstMessage = {
		writerId: user.id,
		indexInThread: 1,	// The first message of the new thread
		content: message,
	}
	const createdThread = await Threads.create(newThread, firstMessage)
	res.status(201).json(createdThread)
}

const addMessage = async (req, res) => {
	// Lisää uuden viestin annettuun viestiketjuun
	return undefined
}

const validatedCreate = [
	check('message')
		.isLength({ min: 1, max: 350 })
		.withMessage('The message must be between 1 and 350 characters'),
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