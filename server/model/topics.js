const { query } = require('../db')
const { GET_ALL_TOPICS,
	/*GET_TOPIC_BY_ID*/ } = require('../db/queries')

// Topics don't change, so they can be cached
let topics = []

const getAll = async () => {
	if (topics.length > 0) {
		return topics
	}
	const rows = await query(GET_ALL_TOPICS, [])
	topics = rows.map(row => rowToTopic(row))
	return topics
}

const getById = async (id) => {
	// const rows = await query(GET_TOPIC_BY_ID, [id])
	// if (rows.length > 0) {
	// 	return rowToTopic(rows[0])
	// }
	// return undefined

	if (topics.length === 0) await getAll()
	const topic = topics.find(topic => topic.id === id)
	return topic
}

const rowToTopic = (row) => {
	return {
		id: row.id,
		name: row.topic_name,
	}
}

module.exports = {
	getAll,
	getById,
}