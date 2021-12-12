const logger = require('../utils/logger')

/**
 * Handles any arrors thrown by the other middleware, logs them, and responds accordingly.
 * @param {*} error
 * @param {*} req
 * @param {*} res
 * @param {*} _next
 * @returns
 */
const errorHandler = (error, req, res, _next) => {
	logger.error(`${error.name}: ${error.message}`)

	switch (error.name) {
		case 'JsonWebTokenError':
			return res.status(401).json({ error: 'invalid token' })
		case 'TokenExpiredError':
			return res.status(401).json({ error: 'token expired' })
	}
	// SQL errors
	switch (error.code) {
		case 'ER_DUP_ENTRY':
			return res.status(400).json({ error: 'Duplicate entry' })
		case 'ER_NO_REFERENCED_ROW_2':
			return res.status(400).json({ error: 'Unknown id' })
		case 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD':
			return res.status(400).json({ error: 'Unknown id' })
	}

	res.status(500).json({ error: 'Unknown server error' })
}

module.exports = errorHandler