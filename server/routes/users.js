const router = require('express').Router()
const Users = require('../model/users')
// const { body, validationResult } = require('express-validator')

//TODO: Tee controllers-kansio, johon nämä reittien käsittelijät, ja tähän vain reittimäärittelyt

router.get('/:id', async (req, res) => {
	const user = await Users.getById(req.params.id)
	if (user)
		res.json(user)
	res.status(404).end()
})

router.get('/', async (req, res) => {
	const users = await Users.getAll()
	res.json(users)
})

router.post('/', async (req, res) => {
	// Validointi!
	const { username, password } = req.body
	const newUser = {
		username,
		password,
	}
	const createdUser = await Users.create(newUser)
	res.status(201).json(createdUser)
})

module.exports = router