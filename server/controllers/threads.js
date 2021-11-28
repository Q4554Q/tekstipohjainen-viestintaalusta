const Threads = require('../model/threads')
const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')

const getAll = async (req, res) => {
	const threads = await Threads.getAll()
	res.json(threads)
}

const getById = async (req, res) => {
	const thread = await Threads.getById(req.params.id)
	if (!thread) {
		res.status(404).json({ error: 'a thread was not found with the given id' })
	}
	res.json(thread)
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
	const user = req.user
	const { message } = req.body
	const threadId = req.params.id

	const newMessage = {
		threadId: threadId,
		writerId: user.id,
		content: message,
	}
	const updatedThread = await Threads.addMessage(newMessage)

	if (!updatedThread) {
		res.status(404).json({ error: 'a thread was not found with the given id' })
	}
	res.status(201).json(updatedThread)
}

const validatedCreate = [
	check('message')
		.isLength({ min: 1, max: 350 })
		.withMessage('The message must be between 1 and 350 characters'),
	validationHandler,
	create,
]

const validatedAddMessage = [
	check('message')
		.isLength({ min: 1, max: 350 })
		.withMessage('The message must be between 1 and 350 characters'),
	validationHandler,
	addMessage,
]

module.exports = {
	getAll,
	getById,
	create: validatedCreate,
	addMessage: validatedAddMessage,
}