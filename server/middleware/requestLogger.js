const logger = require('../utils/logger')

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method)
	logger.info('Path:  ', req.path)
	logger.info('Body:  ', hidePasswords(req.body))
	logger.info('---')
	next()
}

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