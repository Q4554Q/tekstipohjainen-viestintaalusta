const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Users = require('../model/users')
const Threads = require('../model/threads')
const Messages = require('../model/messages')
const Topics = require('../model/topics')
const { conn } = require('../db')

const loginUrl = '/api/login'
const usersUrl = '/api/users'
const topicsUrl = '/api/topics'

describe('when there is initially a topic and a logged in user', () => {
	const user = {
		username: 'testikäyttäjä',
		password: 'Salasana1'
	}
	let token = ''

	beforeEach(async () => {
		await Messages.deleteAllVotes()
		await Messages.deleteAll()
		await Threads.deleteAll()
		await Users.deleteAll()

		await api.post(usersUrl).send(user)

		const response = await api
			.post(loginUrl)
			.send(user)
		token = 'bearer ' + response.body.token
	})

	it('all topics can be viewed', async () => {
		const topicsAtStart = await Topics.getAll()

		const response = await api
			.get(topicsUrl)
			.set('Authorization', token)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const topics = response.body
		expect(topics).toHaveLength(1)
		expect(topics[0].id).toBe(topicsAtStart[0].id)
		expect(topics[0].name).toBe(topicsAtStart[0].name)
	})
})

afterAll(() => {
	conn.end()
})