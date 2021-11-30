const { query } = require('../db')
const { GET_ALL_USERS_WITH_SCORE,
	GET_USER_BY_ID_WITH_SCORE,
	GET_USER_BY_USERNAME,
	CREATE_USER,
	DELETE_ALL_USERS } = require('../db/queries')

const getAll = async () => {
	const rows = await query(GET_ALL_USERS_WITH_SCORE, [])
	const users = rows.map(row => {
		return {
			username: row.username,
			score: row.score,
		}
	})

	return users
}

const getById = async (id) => {
	const rows = await query(GET_USER_BY_ID_WITH_SCORE, [id])
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
	const rows = await query(GET_USER_BY_USERNAME, [username])
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
	const resultEvent = await query(CREATE_USER, [user.username, user.passwordHash])
	const createdUser = await getById(resultEvent.insertId)

	return createdUser
}

// For tests only
const deleteAll = async () => {
	await query(DELETE_ALL_USERS, [])
}

module.exports = {
	getAll,
	getById,
	getByUsername,
	create,
	deleteAll,
}