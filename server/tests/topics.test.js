const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { conn } = require('../db')

const { topicsUrl, testUsers, resetDatabase, createUser, loginUser } = require('./helpers')
const Topics = require('../model/topics')

describe('when there is initially a topic and a logged in user', () => {
	let loggedInUser

	beforeEach(async () => {
		await resetDatabase()
		await createUser(testUsers[0])
		loggedInUser = await loginUser(testUsers[0])
	})

	it('all topics can be viewed', async () => {
		const topicsAtStart = await Topics.getAll()

		const response = await api
			.get(topicsUrl)
			.set('Authorization', loggedInUser.token)
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