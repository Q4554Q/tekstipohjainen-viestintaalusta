const { query } = require('../db')
const { GET_MESSAGE_BY_ID_WITH_SCORE,
	GET_MESSAGES_BY_THREAD_ID_WITH_SCORE,
	GET_USERS_VOTE_ON_MESSAGE,
	CREATE_MESSAGE,
	SET_MESSAGE_REMOVED,
	VOTE_FOR_MESSAGE,
	DELETE_ALL_MESSAGES,
	DELETE_ALL_VOTES } = require('../db/queries')

const getById = async (id, userId) => {
	const rows = await query(GET_MESSAGE_BY_ID_WITH_SCORE, [id])
	if (rows.length > 0 && rows[0].id) {
		return rowToMessage(rows[0], userId)
	}
	return undefined
}

const getByThreadId = async (threadId, userId) => {
	const rows = await query(GET_MESSAGES_BY_THREAD_ID_WITH_SCORE, [threadId])
	const messages = await Promise.all(
		rows.map(async (row) => rowToMessage(row, userId))
	)
	return messages
}

const rowToMessage = async (row, userId) => {
	if (row.removed) {
		return {
			id: row.id,
			writerId: row.writer_id,
			postedTime: row.posted_time,
			score: row.score,
			removed: row.removed,
		}
	}

	return {
		id: row.id,
		writerId: row.writer_id,
		content: row.content,
		postedTime: row.posted_time,
		score: row.score,
		vote: userId ? await getUsersVoteOnMessage(row.id, userId) : 0
	}
}

const getUsersVoteOnMessage = async (messageId, userId) => {
	const rows = await query(GET_USERS_VOTE_ON_MESSAGE, [messageId, userId])
	let vote = 0
	if (rows.length > 0) {
		const row = rows[0]
		vote = row.vote
	}

	return vote
}

const create = async (message) => {
	const resultEvent = await query(CREATE_MESSAGE, [message.threadId, message.writerId, message.indexInThread, message.content])
	const createdMessage = await getById(resultEvent.insertId)

	return createdMessage
}

const remove = async (messageId) => {
	await query(SET_MESSAGE_REMOVED, [messageId])
	const removedMessage = await getById(messageId, undefined)

	return removedMessage
}

const vote = async (vote, userID) => {
	// Check that the message exists
	const message = await getById(vote.messageId, userID)
	if (!message) return undefined

	// Vote the message
	await query(VOTE_FOR_MESSAGE, [vote.writerId, vote.messageId, vote.amount, vote.amount])

	const updatedMessage = await getById(vote.messageId, userID)
	return updatedMessage
}

// For tests only
const deleteAll = async () => {
	await query(DELETE_ALL_MESSAGES, [])
}

// For tests only
const deleteAllVotes = async () => {
	await query(DELETE_ALL_VOTES, [])
}

module.exports = {
	getById,
	getByThreadId,
	create,
	remove,
	vote,
	deleteAll,
	deleteAllVotes,
}