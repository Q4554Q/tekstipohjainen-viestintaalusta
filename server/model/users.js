const query = require('../db')

const getAll = async () => {
	const sql = 'SELECT * FROM users'

	const rows = await query(sql, [])
	const users = rows.map(row => {
		return {
			id: row.id,
			username: row.username,
			// passwordHash: row.password_hash,
		}
	})
	return users
}

const getById = async (id) => {
	const sql = 'SELECT * FROM users WHERE id = ?'

	const rows = await query(sql, [id])
	let user = undefined
	if (rows.length > 0) {
		user = {
			id: rows[0].id,
			username: rows[0].username,
			// passwordHash: rows[0].password_hash,
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
	create,
}