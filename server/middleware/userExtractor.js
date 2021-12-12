const jwt = require('jsonwebtoken')
const Users = require('../model/users')
const { SECRET } = require('../utils/config')

/**
 * Finds the logged in user based on the token in the request object.
 * If the token is missing or malformed, responds qith status 401 unauthorized.
 * If the user specified in the token doesn't exist, responds with 401.
 * Used for protecting routes that the user can access only when logged in.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const userExtractor = async (req, res, next) => {
	if (!req.token) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const decodedToken = jwt.verify(req.token, SECRET)

	if (!decodedToken.id) {
		return res.status(401).json({ error: 'token missing or invalid' })
	}

	const user = await Users.getById(decodedToken.id)
	if (!user.id) {
		return res.status(401).json({ error: 'the user you\'re logged in as doesn\'t exist' })
	}

	req.user = user

	next()
}

module.exports = userExtractor