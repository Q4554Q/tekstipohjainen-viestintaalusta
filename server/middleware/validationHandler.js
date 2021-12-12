const { validationResult } = require('express-validator')

/**
 * Responds with status 422 if the express-validator validation fails.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const validationHandler = (req, res, next) => {
	const errors = validationResult(req)

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() })
	}

	next()
}

module.exports = validationHandler