/**
 * Handles any unknown endpoints by responding with status 404.
 * @param {*} req
 * @param {*} res
 */
const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = unknownEndpoint