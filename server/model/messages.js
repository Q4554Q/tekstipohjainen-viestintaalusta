const query = require('../db')

const getById = async (id) => {
	const sql = 'SELECT messages.*, COALESCE(SUM(amount), 0) AS score ' +
		'FROM messages, votes ' +
		'WHERE id = votes.message_id AND id = ?'

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
			postedTime: row.posted_time,
			score: row.score,
		}
	}

	return message
}

const getByThreadId = async (threadId) => {
	const sql = 'SELECT messages.*, COALESCE(SUM(amount), 0) AS score ' +
		'FROM messages LEFT JOIN votes ON messages.id = votes.message_id ' +
		'WHERE thread_id = ? GROUP BY id;'

	const rows = await query(sql, [threadId])
	const messages = rows.map(row => {
		return {
			id: row.id,
			writerId: row.writer_id,
			content: row.content,
			postedTime: row.posted_time,
			score: row.score,
		}
	})

	return messages
}

const create = async (message) => {
	const sql = 'INSERT INTO messages SET thread_id = ?, writer_id = ?, index_in_thread = ?, content = ?'

	const resultEvent = await query(sql, [message.threadId, message.writerId, message.indexInThread, message.content])
	const createdMessage = await getById(resultEvent.insertId)

	return createdMessage
}

const vote = async (vote) => {
	// Check that the message exists
	const message = await getById(vote.messageId)
	if (!message) return undefined

	// Vote the message
	const sql = 'INSERT INTO votes (writer_id, message_id, amount) VALUES(?, ?, ?) ON DUPLICATE KEY UPDATE amount = ?'
	const resultEvent = await query(sql, [vote.writerId, vote.messageId, vote.amount, vote.amount])

	return resultEvent.affectedRows > 0 ? vote : undefined
}

module.exports = {
	getById,
	getByThreadId,
	create,
	vote,
}