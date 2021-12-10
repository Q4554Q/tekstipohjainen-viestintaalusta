const { query } = require('../db')
const Topics = require('./topics')
const Messages = require('./messages')
const { GET_ALL_THREADS,
	GET_THREAD_BY_ID,
	CREATE_THREAD,
	SET_THREAD_REMOVED,
	DELETE_ALL_THREADS } = require('../db/queries')

const getAll = async (offset, limit, userId) => {
	let rows = await query(GET_ALL_THREADS, [offset, limit])
	rows = rows.filter(row => row.removed === 0)
	const threads = await Promise.all(
		rows.map(async (row) => rowToThread(row, userId))
	)
	return threads
}

const getById = async (threadId, userId) => {
	const rows = await query(GET_THREAD_BY_ID, [threadId])
	if (rows.length > 0 && !rows[0].removed) {
		return rowToThread(rows[0], userId)
	}
	return undefined
}

const rowToThread = async (row, userId) => {
	const messages = await Messages.getByThreadId(row.id, userId)
	return {
		id: row.id,
		topic: await Topics.getById(row.topic_id),
		writerId: row.writer_id,
		messages: messages,
		latestPostedTime: row.posted_time,
		numMessages: messages.length,
	}
}

const create = async (thread, firstMessage) => {
	const resultEvent = await query(CREATE_THREAD, [thread.topicId, thread.writerId])

	await Messages.create({ ...firstMessage, threadId: resultEvent.insertId })

	const createdThread = await getById(resultEvent.insertId)
	return createdThread
}

const remove = async (threadId) => {
	await query(SET_THREAD_REMOVED, [threadId])
}

const addMessage = async (message) => {
	const { threadId } = message

	// Check that the thread exists
	const thread = await getById(threadId)
	if (!thread) return undefined

	// Create a new message with incremented index_in_thread
	const messages = await Messages.getByThreadId(threadId)
	await Messages.create({ ...message, indexInThread: messages.length + 1 })

	const updatedThread = await getById(threadId)
	return updatedThread
}

// For tests only
const deleteAll = async () => {
	await query(DELETE_ALL_THREADS, [])
}

module.exports = {
	getAll,
	getById,
	create,
	remove,
	addMessage,
	deleteAll,
}