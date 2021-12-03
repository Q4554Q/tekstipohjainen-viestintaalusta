const Threads = require('../model/threads')
const Topics = require('../model/topics')
const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')
const hideWriters = require('../utils/hideWriters')

const getAll = async (req, res) => {
	const userId = req.user.id
	let threads = await Threads.getAll(userId)

	// Filter by topic id or name
	const topic = req.query.topic
	if (topic) {
		console.log(topic)
		threads = threads.filter(thread => thread.topic.id.toString() === topic || thread.topic.name === topic)
	}

	threads.forEach(thread => {
		hideWriters(thread, req.user)
		thread.messages = thread.messages.slice(0, 1)
	})

	res.json(threads)
}

const getById = async (req, res) => {
	const userId = req.user.id
	const threadId = req.params.id
	const thread = await Threads.getById(threadId, userId)
	if (!thread) {
		return res.status(404).json({ error: 'a thread was not found with the given id' })
	}
	hideWriters(thread, req.user)
	res.json(thread)
}

const create = async (req, res) => {
	const user = req.user
	const { message, topicId } = req.body

	const newThread = {
		topicId: topicId || 1,	// Add new thread in topic 1 by default
		writerId: user.id
	}
	const firstMessage = {
		writerId: user.id,
		indexInThread: 1,	// The first message of the new thread
		content: message,
	}
	const createdThread = await Threads.create(newThread, firstMessage)
	hideWriters(createdThread, req.user)
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
		return res.status(404).json({ error: 'a thread was not found with the given id' })
	}

	hideWriters(updatedThread, req.user)
	res.status(201).json(updatedThread)
}

const validatedCreate = [
	check('message')
		.isLength({ min: 1, max: 350 })
		.withMessage('The message must be between 1 and 350 characters'),
	check('topicId')
		.isInt()
		.withMessage('Topic id must be an integer')
		.custom(async (value) => {
			const topic = await Topics.getById(value)
			if (!topic) return Promise.reject()
		})
		.withMessage('No topic was found with this id')
		.optional(),
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