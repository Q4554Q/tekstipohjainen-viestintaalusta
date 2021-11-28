const query = require('../db')

const getById = async (id) => {
	const sql = 'SELECT * FROM messages WHERE id = ?'

	const rows = await query(sql, [id])
	let message = undefined
	if (rows.length > 0) {
		const row = rows[0]
		message = {
			id: row.id,
			threadId: row.thread_id,
			writerId: row.writer_id,
			indexInThread: row.index_in_thread,
			content: row.content,
			score: row.score,
			postedTime: row.posted_time,
		}
	}

	return message
}

const getByThreadId = async (threadId) => {
	const sql = 'SELECT * FROM messages WHERE thread_id = ?'

	const rows = await query(sql, [threadId])
	const messages = rows.map(row => {
		return {
			id: row.id,
			threadId: row.thread_id,
			writerId: row.writer_id,
			indexInThread: row.index_in_thread,
			content: row.content,
			score: row.score,
			postedTime: row.posted_time,
		}
	})

	return messages
}

const getFirstInThread = async (threadId) => {
	const sql = 'SELECT * FROM messages WHERE thread_id = ? AND index_in_thread = 1'

	const rows = await query(sql, [threadId])
	let message = undefined
	if (rows.length > 0) {
		const row = rows[0]
		message = {
			id: row.id,
			threadId: row.thread_id,
			writerId: row.writer_id,
			indexInThread: row.index_in_thread,
			content: row.content,
			score: row.score,
			postedTime: row.posted_time,
		}
	}

	return message
}

const create = async (message) => {
	const sql = 'INSERT INTO messages SET thread_id = ?, writer_id = ?, index_in_thread = ?, content = ?'

	const resultEvent = await query(sql, [message.threadId, message.writerId, message.indexInThread, message.content])
	const createdMessage = await getById(resultEvent.insertId)

	return createdMessage
}

module.exports = {
	getById,
	getByThreadId,
	getFirstInThread,
	create,
}