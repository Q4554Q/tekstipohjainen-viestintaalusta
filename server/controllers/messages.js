const Messages = require('../model/messages')
const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')

const vote = async (req, res) => {
	const newVote = {
		writerId: req.user.id,
		messageId: req.params.id,
		amount: req.body.amount,
	}
	const updatedMessage = await Messages.vote(newVote, req.user.id)

	if (!updatedMessage) {
		return res.status(404).json({ error: 'a message was not found with the given id' })
	}

	res.status(200).json(updatedMessage)
}

const remove = async (req, res) => {
	const messageId = req.params.id
	const messageToRemove = await Messages.getById(messageId, req.user.id)

	if (!messageToRemove) {
		return res.status(404).json({ error: 'a message was not found with the given id' })
	} else if (messageToRemove.writerId !== req.user.id) {
		return res.status(401).json({ error: 'you can only remove your own messages' })
	}

	const removedMessage = await Messages.remove(messageId)
	res.json(removedMessage)
}

const validatedVote = [
	check('amount')
		.custom(value => value === 1 || value === 0 || value === -1)
		.withMessage('The vote amount must be either 1, 0 or -1'),
	validationHandler,
	vote,
]

module.exports = {
	vote: validatedVote,
	remove,
}