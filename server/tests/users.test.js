const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Users = require('../model/users')
const { conn } = require('../db')

const { usersUrl, testUsers, resetDatabase, createUser, loginUser } = require('./helpers')

describe('when there are initially two users in the database', () => {
	beforeEach(async () => {
		await resetDatabase()
		await createUser(testUsers[0])
		await createUser(testUsers[1])
	})

	describe('addition of a new user', () => {
		it('succeeds with a fresh username', async () => {
			const usersAtStart = await Users.getAll()

			const newUser = {
				username: 'saku',
				password: 'Salain3n1'
			}

			await api
				.post(usersUrl)
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
				.post(usersUrl)
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
				.post(usersUrl)
				.send(newUser)
				.expect(422)
				.expect('Content-Type', /application\/json/)

			expect(response.body.errors).toHaveLength(4)

			const usersAtEnd = await Users.getAll()
			expect(usersAtEnd).toHaveLength(usersAtStart.length)
		})
	})

	describe('and a user is logged in', () => {
		let loggedInUser

		beforeEach(async () => {
			loggedInUser = await loginUser(testUsers[0])
		})

		it('all users can be viewed', async () => {
			const response = await api
				.get(usersUrl)
				.set('Authorization', loggedInUser.token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			expect(response.body).toHaveLength(2)
			response.body.forEach((user, i) => {
				expect(user.username).toBe(testUsers[i].username)
				expect(user.score).toBeDefined()
			})
		})

		it('passwordHash and id\'s are not returned', async () => {
			const response = await api
				.get(usersUrl)
				.set('Authorization', loggedInUser.token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const user = response.body[0]
			expect(user.passwordHash).not.toBeDefined()
			expect(user.id).not.toBeDefined()
		})

		it('your own profile can be viewed', async () => {
			const response = await api
				.get(usersUrl + '/me')
				.set('Authorization', loggedInUser.token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const yourProfile = response.body
			expect(yourProfile.username).toBe(testUsers[0].username)
			expect(yourProfile.score).toBe(0)
			expect(yourProfile.threads).toHaveLength(0)
		})
	})
})

afterAll(() => {
	conn.end()
})