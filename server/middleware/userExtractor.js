// Hakee tokenin perusteella sisään kirjautuneen käyttäjän ja liittää sen osaksi requestia

// const jwt = require('jsonwebtoken')
// const Users = require('../model/users')
// const { SECRET } = require('../utils/config')

const userExtractor = async (req, res, next) => {
	// if (!req.token) {
	// 	return res.status(401).json({ error: 'token missing or invalid' })
	// }

	// const decodedToken = jwt.verify(req.token, SECRET)

	// if (!decodedToken.id) {
	// 	return res.status(401).json({ error: 'token missing or invalid' })
	// }
	// const user = await Users.findById(decodedToken.id)
	// req.user = user

	next()
}

module.exports = userExtractor