// Hakee requestista access-tokenin ja purkaa sen osaksi request-objektia

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