const { query } = require('../db')
const { GET_ALL_USERS_WITH_SCORE,
	GET_USER_BY_ID_WITH_SCORE,
	GET_USER_BY_USERNAME,
	CREATE_USER,
	DELETE_ALL_USERS } = require('../db/queries')

/**
 * Returns all usernames and their scores.
 * @returns An array of usernames and scores.
 */
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

/**
 * Returns the specified user's info, including their total message score.
 * @param {*} id The user's id.
 * @returns The user's data.
 */
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

/**
 * Find's a user by the given username. Returns all their data, including the password hash, or undefined if not found.
 * @param {*} username The username to search for.
 * @returns The found user.
 */
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

/**
 * Adds a new user to the database.
 * @param {*} user The user to add.
 * @returns The created user.
 */
const create = async (user) => {
	const resultEvent = await query(CREATE_USER, [user.username, user.passwordHash])
	const createdUser = await getById(resultEvent.insertId)

	return createdUser
}

/**
 * Removes all users from the database, for test only.
 */
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