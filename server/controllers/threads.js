const Threads = require('../model/threads')
const Topics = require('../model/topics')
const { check, query } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')
const hideWriters = require('../utils/hideWriters')

/**
 * Responds with all the threads in the database, that contain their first messages only.
 * The threads have any private data, such as user id's, hidden before being sent.
 * The threads can be paginated using query strings 'limit' and 'offset',
 * or filtered to just a single topic by query string 'topic_id'.
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
	const userId = req.user.id
	const offset = parseInt(req.query.offset || 0)
	const limit = parseInt(req.query.limit || 100)

	let threads = await Threads.getAll(offset, limit, userId)

	// Filter by topic id
	const topicId = req.query.topic_id
	if (topicId) {
		threads = threads.filter(thread => thread.topic.id.toString() === topicId)
	}

	threads.forEach(thread => {
		hideWriters(thread, req.user)
		thread.messages = thread.messages.slice(0, 1)
	})

	res.json(threads)
}

/**
 * Responds with a specific thread's data, including all it's messages.
 * The thread's private data, such as user id's, are hidden before being sent.
 * If no thread is found, responds with 404 status.
 * @param {*} req
 * @param {*} res
 * @returns
 */
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

/**
 * Creates a new thread with a starting message given in the request body.
 * The thread can be created in a specified topic, defaults in the main topic.
 * Returns the created thread with it's private data hidden.
 * @param {*} req
 * @param {*} res
 */
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

/**
 * Sets the specified thread as removed.
 * If thread is not found, responds with 404 status, or if attempting to remove someone else's thread, with status 401.
 * @param {*} req
 * @param {*} res
 * @returns
 */
const remove = async (req, res) => {
	const threadId = req.params.id
	const threadToRemove = await Threads.getById(threadId, req.user.id)

	if (!threadToRemove) {
		return res.status(404).json({ error: 'a thread was not found with the given id' })
	} else if (threadToRemove.writerId !== req.user.id) {
		return res.status(401).json({ error: 'you can only remove your own threads' })
	}

	await Threads.remove(threadId)
	res.status(200).end()
}

/**
 * Posts a new message into the specified thread with the message given in the request body, from the logged in user.
 * Responds with the updated thread, that includes the new message and has it's private data hidden.
 * If the thread is not found, responds with 404 status.
 * @param {*} req
 * @param {*} res
 * @returns
 */
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

/**
 * Checks that the offset, limit and topic_id query string parameters are positive integers.
 */
const validatedGetAll = [
	query('offset')
		.isInt({ min: 0 })
		.optional()
		.withMessage('The pagination offset must be a positive integer'),
	query('limit')
		.isInt({ min: 0 })
		.optional()
		.withMessage('The pagination limit must be a positive integer'),
	query('topic_id')
		.isInt({ min: 0 })
		.optional()
		.withMessage('The topic id must be a positive integer'),
	validationHandler,
	getAll,
]

/**
 * Check's that the request's message has correct length, and that the topicId exists.
 */
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

/**
 * Check's that the request's message has correct length.
 */
const validatedAddMessage = [
	check('message')
		.isLength({ min: 1, max: 350 })
		.withMessage('The message must be between 1 and 350 characters'),
	validationHandler,
	addMessage,
]

module.exports = {
	getAll: validatedGetAll,
	getById,
	create: validatedCreate,
	remove,
	addMessage: validatedAddMessage,
}