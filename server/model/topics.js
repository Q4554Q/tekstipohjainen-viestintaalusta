const { query } = require('../db')
const { GET_ALL_TOPICS } = require('../db/queries')

const getAll = async () => {
	const rows = await query(GET_ALL_TOPICS, [])
	const topics = rows.map(row => rowToTopic(row))
	return topics
}

const rowToTopic = (row) => {
	return {
		id: row.id,
		name: row.topic_name,
	}
}

module.exports = {
	getAll,
}