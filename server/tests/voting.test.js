const supertest = require('supertest')
const each = require('jest-each').default
const app = require('../app')
const api = supertest(app)
const Users = require('../model/users')
const Messages = require('../model/messages')
const { conn } = require('../db')

const { messagesUrl, testUsers, resetDatabase, createUser, loginUser, createThread, postMessage } = require('./helpers')

describe('when there are initially two users and a thread by user1 with another message by user1 in the database', () => {
	let loggedInUser
	let testThread

	beforeEach(async () => {
		await resetDatabase()
		await createUser(testUsers[0])
		await createUser(testUsers[1])

		loggedInUser = await loginUser(testUsers[0])
		testThread = await createThread(loggedInUser.id)
		await postMessage(loggedInUser.id, testThread.id)
	})

	describe('and the user is not logged in', () => {
		beforeEach(() => {
			loggedInUser.token = ''
		})

		it('a message cannot be voted', async () => {
			const messagesAtStart = await getMessages()

			const amount = 1
			const response = await voteMessage(messagesAtStart[0].id, amount, 401)

			expect(response.body.error).toBe('token missing or invalid')

			const messagesAtEnd = await getMessages()
			expect(messagesAtEnd).toHaveLength(messagesAtStart.length)
		})
	})

	describe('and user1 is logged in', () => {
		beforeEach(async () => {
			loggedInUser = await loginUser(testUsers[0])
		})

		it('a message can be voted', async () => {
			const messageAtStart = (await getMessages())[0]

			const amount = 1
			const response = await voteMessage(messageAtStart.id, amount, 200)

			const returnedMessage = response.body
			expect(returnedMessage.score).toBe(messageAtStart.score + amount)

			const messageAtEnd = (await getMessages())[0]
			expect(messageAtEnd.score).toBe(messageAtStart.score + amount)
			expect(messageAtEnd.vote).toBe(amount)
		})

		each([
			[-2, true],
			[-1, false],
			[0, false],
			[1, false],
			[2, true],
			['1', true],
		]).test('voting with amount %s fails: %s', async (amount, fails) => {
			const messageAtStart = (await getMessages())[0]
			await voteMessage(messageAtStart.id, amount, fails ? 422 : 200)
		})

		it('voting changes the user\'s score', async () => {
			const userAtStart = await Users.getById(loggedInUser.id)
			const messagesAtStart = await getMessages()

			const amount = 1
			await voteMessage(messagesAtStart[0].id, amount, 200)
			await voteMessage(messagesAtStart[1].id, amount, 200)

			const userAtEnd = await Users.getById(loggedInUser.id)
			expect(userAtEnd.score).toBe(userAtStart.score + 2)
		})
	})

	describe('and user1 has voted their messages, and user2 is logged in', () => {
		beforeEach(async () => {
			loggedInUser = await loginUser(testUsers[0])

			const messages = await getMessages()
			await voteMessage(messages[0].id, 1, 200)
			await voteMessage(messages[1].id, 1, 200)

			loggedInUser = await loginUser(testUsers[1])
		})

		it('voting for user1\'s messages adds score correctly', async () => {
			const messagesAtStart = await getMessages()

			const amount = 1
			await voteMessage(messagesAtStart[0].id, amount, 200)
			await voteMessage(messagesAtStart[1].id, amount, 200)

			const usersAtEnd = await Users.getAll()
			expect(usersAtEnd[0].score).toBe(4)
			expect(usersAtEnd[1].score).toBe(0)
		})
	})

	const voteMessage = async (messageId, amount, expectedCode) => {
		return await api
			.post(`${messagesUrl}/${messageId}`)
			.set('Authorization', loggedInUser.token)
			.send({ 'amount': amount })
			.expect(expectedCode)
			.expect('Content-Type', /application\/json/)
	}

	const getMessages = async () => {
		return await Messages.getByThreadId(testThread.id, loggedInUser.id)
	}
})

afterAll(() => {
	conn.end()
})