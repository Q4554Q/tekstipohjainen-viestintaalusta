// Tänne viestiketjujen reitit

const router = require('express').Router()
const Topics = require('../model/topics')
const { userExtractor } = require('../middleware')

router.get('/', userExtractor, async (req, res) => {
	const topics = await Topics.getTopics()
	res.json(topics)
})

module.exports = router