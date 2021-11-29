const query = require('../db')
const Messages = require('./messages')
const { GET_ALL_THREADS,
	GET_THREAD_BY_ID,
	CREATE_THREAD } = require('../db/queries')

const getAll = async () => {
	const rows = await query(GET_ALL_THREADS, [])
	const threads = await Promise.all(rows.map(async (row) => {
		return {
			id: row.id,
			topicId: row.topic_id,
			writerId: row.writer_id,
			messages: await Messages.getByThreadId(row.id)
		}
	}))

	return threads
}

const getById = async (id) => {
	const rows = await query(GET_THREAD_BY_ID, [id])
	let thread = undefined
	if (rows.length > 0) {
		const row = rows[0]
		thread = {
			id: row.id,
			topicId: row.topic_id,
			writerId: row.writer_id,
			messages: await Messages.getByThreadId(row.id),
		}
	}

	return thread
}

const create = async (thread, firstMessage) => {
	const resultEvent = await query(CREATE_THREAD, [thread.topicId, thread.writerId])

	// Add the first message to the thread
	firstMessage.threadId = resultEvent.insertId
	await Messages.create(firstMessage)

	const createdThread = await getById(resultEvent.insertId)

	return createdThread
}

const addMessage = async (message) => {
	const { threadId } = message

	// Check that the thread exists
	const thread = await getById(threadId)
	if (!thread) return undefined

	// Create a new message with incremented index_in_thread
	const messages = await Messages.getByThreadId(threadId)
	message.indexInThread = messages.length + 1
	await Messages.create(message)

	// Return the updated thread
	const updatedThread = await getById(threadId)
	return updatedThread
}

module.exports = {
	getAll,
	getById,
	create,
	addMessage,
}