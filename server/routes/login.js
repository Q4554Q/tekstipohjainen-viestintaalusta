const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../model/users')
const { SECRET } = require('../utils/config')

router.post('/', async (req, res) => {
	const body = req.body

	const user = await Users.findByUsername({ username: body.username })
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(body.password, user.passwordHash)

	if (!user || !passwordCorrect) {
		return res.status(401).json({ error: 'invalid username or password' })
	}

	const userForToken = {
		username: body.username,
		id: user._id,
	}

	const token = jwt.sign(
		userForToken,
		SECRET,
		{ expiresIn: 60 * 60 * 24 }
	)

	res.status(200)
		.send({
			token,
			username: user.username,
			name: user.name,
		})
})

module.exports = router