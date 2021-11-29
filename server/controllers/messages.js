const Messages = require('../model/messages')
const { check } = require('express-validator')
const validationHandler = require('../middleware/validationHandler')

const vote = async (req, res) => {
	const newVote = {
		writerId: req.user.id,
		messageId: req.params.id,
		amount: req.body.amount,
	}
	const createdVote = await Messages.vote(newVote)

	if (!createdVote) {
		return res.status(404).json({ error: 'a message was not found with the given id' })
	}

	res.status(200).json(createdVote)
}

const validatedVote = [
	check('amount')
		.custom(value => value === 1 || value === -1)
		.withMessage('The vote amount must be either 1 or -1'),
	validationHandler,
	vote,
]

module.exports = {
	vote: validatedVote,
}