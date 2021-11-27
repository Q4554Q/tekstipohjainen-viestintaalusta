const logger = require('../utils/logger')

const errorHandler = (error, req, res, next) => {
	logger.error(`${error.name}: ${error.message}`)

	switch (error.name) {
		case 'JsonWebTokenError':
			return res.status(401).send({ error: 'invalid token' })
		case 'TokenExpiredError':
			return res.status(401).send({ error: 'token expired' })
	}
	// SQL errors
	switch (error.code) {
		case 'ER_DUP_ENTRY':
			return res.status(400).send({ error: 'username already exists' })
	}

	next(error)
}

module.exports = errorHandler