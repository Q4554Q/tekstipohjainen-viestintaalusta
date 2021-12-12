const Topics = require('../model/topics')

/**
 * Responds with all the topics in the database.
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
	const topics = await Topics.getAll()
	res.json(topics)
}

module.exports = {
	getAll,
}