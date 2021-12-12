const { query } = require('../db')
const { GET_MESSAGE_BY_ID_WITH_SCORE,
	GET_MESSAGES_BY_THREAD_ID_WITH_SCORE,
	GET_USERS_VOTE_ON_MESSAGE,
	CREATE_MESSAGE,
	SET_MESSAGE_REMOVED,
	VOTE_FOR_MESSAGE,
	DELETE_ALL_MESSAGES,
	DELETE_ALL_VOTES } = require('../db/queries')

/**
 * Returns a message of the given id, or undefined if not found.
 * The message data contains the logged in user's vote on this message.
 * @param {*} id The message's id.
 * @param {*} userId The logged in user's id that is requesting the message.
 * @returns The found message.
 */
const getById = async (id, userId) => {
	const rows = await query(GET_MESSAGE_BY_ID_WITH_SCORE, [id])
	if (rows.length > 0 && rows[0].id) {
		return rowToMessage(rows[0], userId)
	}
	return undefined
}

/**
 * Returns all messages of a given thread.
 * The messages' data contains the logged in user's votes on the messages.
 * @param {*} threadId The thread which messages are returned.
 * @param {*} userId The logged in user's id.
 * @returns The messages of the thread.
 */
const getByThreadId = async (threadId, userId) => {
	const rows = await query(GET_MESSAGES_BY_THREAD_ID_WITH_SCORE, [threadId])
	const messages = await Promise.all(
		rows.map(async (row) => rowToMessage(row, userId))
	)
	return messages
}

/**
 * Parses the given row from an SQL query into a message object.
 * If the message has been set removed, the content and user's vote on the message are not returned.
 * @param {*} row The SQL query result's row.
 * @param {*} userId The logged in user's id for retrieving their vote on the message.
 * @returns The message object.
 */
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

/**
 * Finds the amount that the given user has voted for the specified message.
 * @param {*} messageId The message id.
 * @param {*} userId The user's id.
 * @returns The vote amount.
 */
const getUsersVoteOnMessage = async (messageId, userId) => {
	const rows = await query(GET_USERS_VOTE_ON_MESSAGE, [messageId, userId])
	let vote = 0
	if (rows.length > 0) {
		const row = rows[0]
		vote = row.vote
	}

	return vote
}

/**
 * Adds a new message to the database.
 * @param {*} message The message to add.
 * @returns The created message.
 */
const create = async (message) => {
	const resultEvent = await query(CREATE_MESSAGE, [message.threadId, message.writerId, message.indexInThread, message.content])
	const createdMessage = await getById(resultEvent.insertId)

	return createdMessage
}

/**
 * Sets the specified message as removed.
 * @param {*} messageId The message's id.
 * @returns The removed message.
 */
const remove = async (messageId) => {
	await query(SET_MESSAGE_REMOVED, [messageId])
	const removedMessage = await getById(messageId, undefined)

	return removedMessage
}

/**
 * Adds the given vote to the database.
 * Checks that the message to be voted does exist, otherwise return undefined.
 * @param {*} vote The vote to add.
 * @param {*} userID The logged in user's id.
 * @returns The messages updated vote related data.
 */
const vote = async (vote, userID) => {
	// Check that the message exists
	const message = await getById(vote.messageId, userID)
	if (!message) return undefined

	// Vote the message
	await query(VOTE_FOR_MESSAGE, [vote.writerId, vote.messageId, vote.amount, vote.amount])

	const updatedMessage = await getById(vote.messageId, userID)
	delete updatedMessage.writerId
	delete updatedMessage.content
	delete updatedMessage.postedTime

	return updatedMessage
}

/**
 * Removes all messages from the database. For tests only.
 */
const deleteAll = async () => {
	await query(DELETE_ALL_MESSAGES, [])
}

/**
 * Removes all votes from the database. For tests only.
 */
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