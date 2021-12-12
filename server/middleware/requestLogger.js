const logger = require('../utils/logger')

/**
 * Logs all incoming requests to the console. Any incoming passwords are hidden so they're not accidentally viewed by the developer.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method)
	logger.info('Path:  ', req.path)
	logger.info('Body:  ', hidePasswords(req.body))
	logger.info('---')
	next()
}

/**
 * Hides any passwords from the given request body.
 * @param {*} body
 * @returns
 */
const hidePasswords = (body) => {
	let bodyWithHiddenPasswords = {}
	const hiddenProperties = [
		'password',
		'passwordhash'
	]

	for (const property in body) {
		bodyWithHiddenPasswords[property] = hiddenProperties.includes(property.toLowerCase())
			? '******'
			: body[property]
	}

	return bodyWithHiddenPasswords
}

module.exports = requestLogger