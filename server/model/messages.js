const query = require('../db')
const { GET_MESSAGE_BY_ID_WITH_SCORE,
	GET_MESSAGES_BY_THREAD_ID_WITH_SCORE,
	CREATE_MESSAGE } = require('../db/queries')

const getById = async (id) => {
	const rows = await query(GET_MESSAGE_BY_ID_WITH_SCORE, [id])
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
	const rows = await query(GET_MESSAGES_BY_THREAD_ID_WITH_SCORE, [threadId])
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
	const resultEvent = await query(CREATE_MESSAGE, [message.threadId, message.writerId, message.indexInThread, message.content])
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