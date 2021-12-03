
// USERS

module.exports.GET_ALL_USERS_WITH_SCORE =
	`SELECT users.*, COALESCE(SUM(amount), 0) AS score
	FROM users
		LEFT JOIN messages ON users.id = messages.writer_id
			LEFT JOIN votes ON messages.id = votes.message_id
	GROUP BY users.id`

module.exports.GET_USER_BY_ID_WITH_SCORE =
	`SELECT users.*, COALESCE(SUM(amount), 0) AS score
	FROM users
	LEFT JOIN messages ON users.id = messages.writer_id
	LEFT JOIN votes ON messages.id = votes.message_id
	WHERE users.id = ?`

module.exports.GET_USER_BY_USERNAME =
	`SELECT * FROM users
	WHERE username = ?`

module.exports.CREATE_USER =
	`INSERT INTO users
	SET username = ?, password_hash = ?`

module.exports.DELETE_ALL_USERS =
	'DELETE FROM users'


// TOPICS

module.exports.GET_ALL_TOPICS =
	'SELECT * FROM topics'

module.exports.GET_TOPIC_BY_ID =
	`SELECT * FROM topics
	WHERE id = ?`


// THREADS

// Sorts the threads by their latest message's posted_time
module.exports.GET_ALL_THREADS =
	`SELECT * FROM threads, (
		SELECT DISTINCT thread_id, posted_time FROM (
			SELECT *, RANK() OVER (PARTITION BY thread_id
			ORDER BY posted_time DESC) dest_rank
			FROM messages
		) ranked_messages
		WHERE ranked_messages.dest_rank = 1
	) latest_post
	WHERE threads.id = latest_post.thread_id
	ORDER BY posted_time DESC`

module.exports.GET_THREAD_BY_ID =
	`SELECT * FROM threads
	WHERE id = ?`

module.exports.CREATE_THREAD =
	`INSERT INTO threads
	SET topic_id = ?, writer_id = ?`

module.exports.DELETE_ALL_THREADS =
	'DELETE FROM threads'


// MESSAGES

module.exports.GET_MESSAGE_BY_ID_WITH_SCORE =
	`SELECT messages.*, COALESCE(SUM(amount), 0) AS score
	FROM messages, votes
	WHERE id = votes.message_id AND id = ?`

module.exports.GET_MESSAGES_BY_THREAD_ID_WITH_SCORE =
	`SELECT messages.*, COALESCE(SUM(amount), 0) AS score
	FROM messages LEFT JOIN votes ON messages.id = votes.message_id
	WHERE thread_id = ? GROUP BY id`

module.exports.GET_USERS_VOTE_ON_MESSAGE =
	`SELECT COALESCE(amount, 0) AS vote
	FROM votes
	WHERE message_id = ? AND writer_id = ?`

module.exports.CREATE_MESSAGE =
	`INSERT INTO messages
	SET thread_id = ?, writer_id = ?, index_in_thread = ?, content = ?`

module.exports.VOTE_FOR_MESSAGE =
	`INSERT INTO votes (writer_id, message_id, amount)
	VALUES(?, ?, ?)
	ON DUPLICATE KEY UPDATE amount = ?`

module.exports.DELETE_ALL_MESSAGES =
	'DELETE FROM messages'

module.exports.DELETE_ALL_VOTES =
	'DELETE FROM votes'
