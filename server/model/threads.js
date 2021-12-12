const { query } = require('../db')
const Topics = require('./topics')
const Messages = require('./messages')
const { GET_ALL_THREADS,
	GET_THREAD_BY_ID,
	CREATE_THREAD,
	SET_THREAD_REMOVED,
	DELETE_ALL_THREADS } = require('../db/queries')

/**
 * Returns all threads and their messages from the database.
 * Threads that are marked removed are not returned.
 * The results can be paginated using the offset and limit parameters.
 * @param {*} offset For pagination, offsets the returned result set.
 * @param {*} limit For pagination, limits the returned result set.
 * @param {*} userId The logged in user's id.
 * @returns An array of threads.
 */
const getAll = async (offset, limit, userId) => {
	let rows = await query(GET_ALL_THREADS, [offset, limit])
	rows = rows.filter(row => row.removed === 0)
	const threads = await Promise.all(
		rows.map(async (row) => rowToThread(row, userId))
	)
	return threads
}

/**
 * Returns a thread of the given id from the database, or undefined if not found or marked removed.
 * @param {*} threadId The thread's id.
 * @param {*} userId The logged in user's id.
 * @returns The found thread, including it's messages.
 */
const getById = async (threadId, userId) => {
	const rows = await query(GET_THREAD_BY_ID, [threadId])
	if (rows.length > 0 && !rows[0].removed) {
		return rowToThread(rows[0], userId)
	}
	return undefined
}

/**
 * Parses the given row from an SQL query into a thread object.
 * @param {*} row The SQL query result's row.
 * @param {*} userId The logged in user's id for retrieving their votes on the thread's messages.
 * @returns The thread object.
 */
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

/**
 * Adds the given thread into the database, and creates it's first message.
 * @param {*} thread The thread to create.
 * @param {*} firstMessage The first message to post.
 * @returns The created thread.
 */
const create = async (thread, firstMessage) => {
	const resultEvent = await query(CREATE_THREAD, [thread.topicId, thread.writerId])

	await Messages.create({ ...firstMessage, threadId: resultEvent.insertId })

	const createdThread = await getById(resultEvent.insertId)
	return createdThread
}

/**
 * Sets the specified thread as removed.
 * @param {*} threadId The thread to remove.
 */
const remove = async (threadId) => {
	await query(SET_THREAD_REMOVED, [threadId])
}

/**
 * Adds the given message to the database.
 * Returns undefined if the thread that this message is being posted to doesn't exist.
 * @param {*} message The message to add.
 * @returns The updated thread, including the new message.
 */
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

/**
 * Removes all threads from the database. For tests only.
 */
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