/**
 * Extracts the access token from the authorization header and sets it as a parameter in the request.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		req.token = authorization.substring(7)
	} else {
		req.token = null
	}

	next()
}

module.exports = tokenExtractor