const Users = require('../model/users')
// const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const getAll = async (req, res) => {
	const users = await Users.getAll()
	res.json(users)
}

const getById = async (req, res) => {
	const user = await Users.getById(req.params.id)
	if (user)
		res.json(user)
	res.status(404).end()
}

const create = async (req, res) => {
	// Validointi!
	const { username, password } = req.body
	const passwordHash = await bcrypt.hash(password, 10)

	const newUser = {
		username,
		passwordHash,
	}
	const createdUser = await Users.create(newUser)
	res.status(201).json(createdUser)
}

module.exports = {
	getAll,
	getById,
	create,
}