const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../model/users')
const { SECRET } = require('../utils/config')
const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')

const login = async (req, res) => {
	const { username, password } = req.body

	const user = await Users.getByUsername(username)
	const passwordCorrect = user === undefined
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!user || !passwordCorrect) {
		return res.status(401).json({ error: 'invalid username or password' })
	}

	const userForToken = {
		username: user.username,
		id: user.id,
	}

	const token = jwt.sign(
		userForToken,
		SECRET,
		{ expiresIn: '24h' }
	)

	res.status(200)
		.send({
			token,
			user: userForToken
		})
}

const validatedLogin = [
	check('username')
		.exists()
		.withMessage('missing username'),
	check('password')
		.exists()
		.withMessage('missing password'),
	validationHandler,
	login,
]

module.exports = {
	login: validatedLogin
}