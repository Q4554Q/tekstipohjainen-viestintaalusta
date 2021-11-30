const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Users = require('../model/users')
const { conn } = require('../db')

const baseUrl = '/api/users'

describe('when there\'s initially one user in the database', () => {
	beforeEach(async () => {
		await Users.deleteAll()
		const testUser = {
			username: 'testikäyttäjä',
			passwordHash: await bcrypt.hash('Salasana1', 10)
		}
		await Users.create(testUser)
	})

	describe('addition of a new user', () => {
		it('succeeds with a fresh username', async () => {
			const usersAtStart = await Users.getAll()

			const newUser = {
				username: 'saku',
				password: 'Salainen1'
			}

			await api
				.post(baseUrl)
				.send(newUser)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const usersAtEnd = await Users.getAll()
			expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

			const usernames = usersAtEnd.map(user => user.username)
			expect(usernames).toContain(newUser.username)
		})

		it('fails with an existing username', async () => {
			const usersAtStart = await Users.getAll()

			const newUser = {
				username: usersAtStart[0].username,
				password: 'Salainen1'
			}

			const response = await api
				.post(baseUrl)
				.send(newUser)
				.expect(400)
				.expect('Content-Type', /application\/json/)

			expect(response.body.error).toContain('Duplicate entry')

			const usersAtEnd = await Users.getAll()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})

		it('fails with too short username and password', async () => {
			const usersAtStart = await Users.getAll()

			const newUser = {
				username: 'sa',
				password: '12345'
			}

			const response = await api
				.post(baseUrl)
				.send(newUser)
				.expect(422)
				.expect('Content-Type', /application\/json/)

			expect(response.body.errors).toHaveLength(4)

			const usersAtEnd = await Users.getAll()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})
	})

	describe('and the user is logged in', () => {
		let token = ''
		let testUser = {
			username: 'testikäyttäjä',
			password: 'Salasana1'
		}

		beforeEach(async () => {
			const response = await api.post('/api/login').send(testUser)
			token = 'bearer ' + response.body.token
		})

		it('all users can be viewed', async () => {
			const response = await api
				.get(baseUrl)
				.set('Authorization', token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			expect(response.body).toHaveLength(1)
			expect(response.body[0].username).toBe(testUser.username)
		})

		it('passwordHash and id\'s are not returned', async () => {
			const response = await api
				.get(baseUrl)
				.set('Authorization', token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			expect(response.body[0].passwordHash).not.toBeDefined()
			expect(response.body[0].id).not.toBeDefined()
		})

		it('your own profile can be viewed', async () => {
			const response = await api
				.get(baseUrl + '/me')
				.set('Authorization', token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const yourProfile = response.body
			expect(yourProfile.username).toBe(testUser.username)
			expect(yourProfile.score).toBe(0)
			expect(yourProfile.threads).toHaveLength(0)
		})
	})
})

afterAll(() => {
	conn.end()
})