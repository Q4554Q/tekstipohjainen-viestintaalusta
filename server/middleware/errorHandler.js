// Käsittelee kaikki serverin virheet

const logger = require('../utils/logger')

const errorHandler = (error, req, res, next) => {
	logger.error(`${error.name}: ${error.message}`)

	switch (error.name) {
		case 'JsonWebTokenError':
			return res.status(401).send({ error: 'invalid token' })

		case 'TokenExpiredError':
			return res.status(401).send({ error: 'token expired' })
	}

	next(error)
}

module.exports = errorHandler