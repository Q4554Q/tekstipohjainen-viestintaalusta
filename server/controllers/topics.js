const Topics = require('../model/topics')

const getAll = async (req, res) => {
	const topics = await Topics.getAll()
	res.json(topics)
}

module.exports = {
	getAll,
}