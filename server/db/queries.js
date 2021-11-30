
// USERS

const GET_ALL_USERS_WITH_SCORE =
	'SELECT users.*, COALESCE(SUM(amount), 0) AS score ' +
	'FROM users ' +
	'LEFT JOIN messages ON users.id = messages.writer_id ' +
	'LEFT JOIN votes ON messages.id = votes.message_id ' +
	'GROUP BY users.id'

const GET_USER_BY_ID_WITH_SCORE =
	'SELECT users.*, COALESCE(SUM(amount), 0) AS score ' +
	'FROM users ' +
	'LEFT JOIN messages ON users.id = messages.writer_id ' +
	'LEFT JOIN votes ON messages.id = votes.message_id ' +
	'WHERE users.id = ?'

const GET_USER_BY_USERNAME =
	'SELECT * FROM users ' +
	'WHERE username = ?'

const CREATE_USER =
	'INSERT INTO users ' +
	'SET username = ?, password_hash = ?'

const DELETE_ALL_USERS =
	'DELETE FROM users'


// THREADS

const GET_ALL_THREADS =
	'SELECT * FROM threads'

const GET_THREAD_BY_ID =
	'SELECT * FROM threads ' +
	'WHERE id = ?'

const CREATE_THREAD =
	'INSERT INTO threads ' +
	'SET topic_id = ?, writer_id = ?'


// MESSAGES

const GET_MESSAGE_BY_ID_WITH_SCORE =
	'SELECT messages.*, COALESCE(SUM(amount), 0) AS score ' +
	'FROM messages, votes ' +
	'WHERE id = votes.message_id AND id = ?'

const GET_MESSAGES_BY_THREAD_ID_WITH_SCORE =
	'SELECT messages.*, COALESCE(SUM(amount), 0) AS score ' +
	'FROM messages LEFT JOIN votes ON messages.id = votes.message_id ' +
	'WHERE thread_id = ? GROUP BY id'

const GET_USERS_VOTE_ON_MESSAGE =
	'SELECT COALESCE(amount, 0) AS vote ' +
	'FROM votes ' +
	'WHERE message_id = ? AND writer_id = ?'

const CREATE_MESSAGE =
	'INSERT INTO messages ' +
	'SET thread_id = ?, writer_id = ?, index_in_thread = ?, content = ?'

const VOTE_FOR_MESSAGE =
	'INSERT INTO votes (writer_id, message_id, amount) ' +
	'VALUES(?, ?, ?) ' +
	'ON DUPLICATE KEY UPDATE amount = ?'

module.exports = {
	GET_ALL_USERS_WITH_SCORE,
	GET_USER_BY_ID_WITH_SCORE,
	GET_USER_BY_USERNAME,
	CREATE_USER,
	DELETE_ALL_USERS,
	GET_ALL_THREADS,
	GET_THREAD_BY_ID,
	CREATE_THREAD,
	GET_MESSAGE_BY_ID_WITH_SCORE,
	GET_MESSAGES_BY_THREAD_ID_WITH_SCORE,
	GET_USERS_VOTE_ON_MESSAGE,
	CREATE_MESSAGE,
	VOTE_FOR_MESSAGE,
}