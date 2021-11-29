const query = require('../db')

const getAll = async () => {
	const sql = 'SELECT users.*, COALESCE(SUM(amount), 0) AS score ' +
	'FROM users LEFT JOIN messages ON users.id = messages.writer_id LEFT JOIN votes ON messages.id = votes.message_id ' +
	'GROUP BY users.id'

	const rows = await query(sql, [])
	const users = rows.map(row => {
		return {
			username: row.username,
			score: row.score,
		}
	})

	return users
}

const getById = async (id) => {
	const sql = 'SELECT users.*, COALESCE(SUM(amount), 0) AS score ' +
		'FROM users LEFT JOIN messages ON users.id = messages.writer_id LEFT JOIN votes ON messages.id = votes.message_id ' +
		'WHERE users.id = ?'

	const rows = await query(sql, [id])
	let user = undefined
	if (rows.length > 0) {
		const row = rows[0]
		user = {
			id: row.id,
			username: row.username,
			score: row.score,
		}
	}

	return user
}

const getByUsername = async (username) => {
	const sql = 'SELECT * FROM users WHERE username = ?'

	const rows = await query(sql, [username])
	let user = undefined
	if (rows.length > 0) {
		const row = rows[0]
		user = {
			id: row.id,
			username: row.username,
			passwordHash: row.password_hash,
		}
	}

	return user
}

const create = async (user) => {
	const sql = 'INSERT INTO users SET username = ?, password_hash = ?'

	const resultEvent = await query(sql, [user.username, user.passwordHash])
	const createdUser = await getById(resultEvent.insertId)

	return createdUser
}

module.exports = {
	getAll,
	getById,
	getByUsername,
	create,
}