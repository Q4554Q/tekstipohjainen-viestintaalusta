const { query } = require('../db')
const { GET_ALL_TOPICS,
	/*GET_TOPIC_BY_ID*/ } = require('../db/queries')

// Topics don't change, so they can be cached
let topics = []

/**
 * Returns all the topics.
 * @returns The topics.
 */
const getAll = async () => {
	if (topics.length > 0) {
		return topics
	}
	const rows = await query(GET_ALL_TOPICS, [])
	topics = rows.map(row => rowToTopic(row))
	return topics
}

/**
 * Returns the specified topic, or undefined if not found.
 * @param {*} id The topic's id.
 * @returns The found topic.
 */
const getById = async (id) => {
	if (topics.length === 0) await getAll()
	const topic = topics.find(topic => topic.id === id)
	return topic
}

/**
 * Parses the given row from an SQL query into a topic object.
 * @param {*} row The SQL query result's row.
 * @returns The topic object.
 */
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