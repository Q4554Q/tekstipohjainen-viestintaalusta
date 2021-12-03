const supertest = require('supertest')
const each = require('jest-each').default
const app = require('../app')
const api = supertest(app)
const Users = require('../model/users')
const Topics = require('../model/topics')
const Threads = require('../model/threads')
const Messages = require('../model/messages')
const { conn } = require('../db')

const loginUrl = '/api/login'
const usersUrl = '/api/users'
const threadsUrl = '/api/threads'
const messagesUrl = '/api/messages'

describe('when there are initially two users and a thread by user1 with a second comment by user1 in the database', () => {
	const user1 = {
		username: 'testikäyttäjä1',
		password: 'Salasana1'
	}
	const user2 = {
		username: 'testikäyttäjä2',
		password: 'Sal4sana2'
	}
	let loggedInUser = undefined
	let token = ''
	let createdThread = undefined
	let topics

	beforeEach(async () => {
		await Messages.deleteAllVotes()
		await Messages.deleteAll()
		await Threads.deleteAll()
		await Users.deleteAll()

		await api.post(usersUrl).send(user1)
		await api.post(usersUrl).send(user2)

		const response = await api
			.post(loginUrl)
			.send(user1)
		token = 'bearer ' + response.body.token
		loggedInUser = response.body.user

		const newThread = {
			topicId: 1,
			writerId: loggedInUser.id
		}
		const firstMessage = {
			writerId: loggedInUser.id,
			indexInThread: 1,
			content: 'Testiviesti',
		}
		createdThread = await Threads.create(newThread, firstMessage)

		const newMessage = {
			threadId: createdThread.id,
			writerId: loggedInUser.id,
			content: 'Toinen testiviesti',
		}
		await Threads.addMessage(newMessage)

		topics = await Topics.getAll()
	})

	describe('and the user is not logged in', () => {
		it('no threads are returned', async () => {
			const response = await api
				.get(threadsUrl)
				.expect(401)
				.expect('Content-Type', /application\/json/)

			expect(response.body.error).toBe('token missing or invalid')
			expect(response.body.length).not.toBeDefined()
		})

		it('a single thread is not returned', async () => {
			const response = await api
				.get(`${threadsUrl}/${createdThread.id}`)
				.expect(401)
				.expect('Content-Type', /application\/json/)

			expect(response.body.error).toBe('token missing or invalid')
			expect(response.body.messages).not.toBeDefined()
		})

		it('a thread cannot be created', async () => {
			const threadsAtStart = await Threads.getAll(loggedInUser.id)

			const newMessage = {
				'message': 'Toinen testilanka'
			}
			const response = await api
				.post(threadsUrl)
				.send(newMessage)
				.expect(401)
				.expect('Content-Type', /application\/json/)

			expect(response.body.error).toBe('token missing or invalid')

			const threadsAtEnd = await Threads.getAll(loggedInUser.id)
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length)
		})

		it('a message cannot be posted', async () => {
			const threadAtStart = await Threads.getById(createdThread.id, loggedInUser.id)

			const newMessage = {
				'message': 'Testaillaan'
			}
			const response = await api
				.post(`${threadsUrl}/${threadAtStart.id}`)
				.send(newMessage)
				.expect(401)
				.expect('Content-Type', /application\/json/)

			expect(response.body.error).toBe('token missing or invalid')

			const threadAtEnd = await Threads.getById(createdThread.id, loggedInUser.id)
			expect(threadAtEnd.messages).toHaveLength(threadAtStart.messages.length)
		})
	})

	describe('and user1 is logged in', () => {
		beforeEach(async () => {
			const response = await api
				.post(loginUrl)
				.send(user1)
			token = 'bearer ' + response.body.token
			loggedInUser = response.body.user
		})

		it('all threads can be viewed and have correct data', async () => {
			const response = await api
				.get(threadsUrl)
				.set('Authorization', token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const thread = response.body[0]
			expect(response.body).toHaveLength(1)
			expect(thread.id).toBeDefined()
			expect(thread.topic.id).toBe(topics[0].id)
			expect(thread.topic.name).toBe(topics[0].name)
			expect(thread.messages).toHaveLength(1)	// Only the first message is shown
			expect(thread.yourWriterId).toBe(1)
		})

		it('a single thread can be viewed and has correct data', async () => {
			const response = await api
				.get(`${threadsUrl}/${createdThread.id}`)
				.set('Authorization', token)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const thread = response.body
			expect(thread.id).toBe(createdThread.id)
			expect(thread.topic.id).toBe(topics[0].id)
			expect(thread.topic.name).toBe(topics[0].name)
			expect(thread.messages).toHaveLength(2)
			expect(thread.yourWriterId).toBe(1)
		})

		it('a new thread can be created', async () => {
			const threadsAtStart = await Threads.getAll(loggedInUser.id)

			const newThread = {
				'message': 'Toinen testilanka',
				'topicId': 1,
			}
			const response = await api
				.post(threadsUrl)
				.set('Authorization', token)
				.send(newThread)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const createdThread = response.body
			expect(createdThread.messages[0].content).toBe(newThread.message)

			const threadsAtEnd = await Threads.getAll(loggedInUser.id)
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length + 1)
		})

		it('empty message won\'t create a new thread', async () => {
			const threadsAtStart = await Threads.getAll(loggedInUser.id)

			const newThread = {
				'message': '',
			}
			const response = await api
				.post(threadsUrl)
				.set('Authorization', token)
				.send(newThread)
				.expect(422)
				.expect('Content-Type', /application\/json/)

			expect(response.body.errors).toHaveLength(1)
			expect(response.body.errors[0].msg).toBe('The message must be between 1 and 350 characters')

			const threadsAtEnd = await Threads.getAll()
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length)
		})

		it('thread cannot be created with a non existing topic id', async () => {
			const threadsAtStart = await Threads.getAll(loggedInUser.id)

			const newThread = {
				'message': 'Toinen testilanka',
				'topicId': 2
			}
			const response = await api
				.post(threadsUrl)
				.set('Authorization', token)
				.send(newThread)
				.expect(422)
				.expect('Content-Type', /application\/json/)

			expect(response.body.errors).toHaveLength(1)
			expect(response.body.errors[0].msg).toBe('No topic was found with this id')

			const threadsAtEnd = await Threads.getAll()
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length)
		})

		it('a new message can be posted', async () => {
			const threadAtStart = await Threads.getById(createdThread.id, loggedInUser.id)

			const newMessage = {
				'message': 'Testaillaan'
			}
			const response = await api
				.post(`${threadsUrl}/${threadAtStart.id}`)
				.set('Authorization', token)
				.send(newMessage)
				.expect(201)
				.expect('Content-Type', /application\/json/)

			const createdComment = response.body.messages[2]
			expect(createdComment.content).toBe(newMessage.message)
			expect(createdComment.writerId).toBe(1)
			expect(createdComment.postedTime).toBeDefined()
			expect(createdComment.score).toBe(0)
			expect(createdComment.vote).toBe(0)

			const threadAtEnd = await Threads.getById(createdThread.id, loggedInUser.id)
			expect(threadAtEnd.messages).toHaveLength(threadAtStart.messages.length + 1)
		})

		it('a message can be voted', async () => {
			const threadAtStart = await Threads.getById(createdThread.id, loggedInUser.id)
			const messageAtStart = threadAtStart.messages[0]

			const newVote = {
				'amount': 1
			}
			const response = await api
				.post(`${messagesUrl}/${messageAtStart.id}`)
				.set('Authorization', token)
				.send(newVote)
				.expect(200)
				.expect('Content-Type', /application\/json/)

			const returnedMessage = response.body
			expect(returnedMessage.score).toBe(messageAtStart.score + newVote.amount)

			const threadAtEnd = await Threads.getById(createdThread.id, loggedInUser.id)
			const messageAtEnd = threadAtEnd.messages[0]
			expect(messageAtEnd.score).toBe(messageAtStart.score + newVote.amount)
			expect(messageAtEnd.vote).toBe(newVote.amount)
		})

		it('voting changes the user\'s score', async () => {
			const userAtStart = await Users.getById(loggedInUser.id)
			const threadAtStart = await Threads.getById(createdThread.id, loggedInUser.id)

			const newVote = {
				'amount': 1
			}
			await api
				.post(`${messagesUrl}/${threadAtStart.messages[0].id}`)
				.set('Authorization', token)
				.send(newVote)
			await api
				.post(`${messagesUrl}/${threadAtStart.messages[1].id}`)
				.set('Authorization', token)
				.send(newVote)

			const userAtEnd = await Users.getById(loggedInUser.id)
			expect(userAtEnd.score).toBe(userAtStart.score + 2)
		})

		each([
			[-2, true],
			[-1, false],
			[0, false],
			[1, false],
			[2, true],
		]).test('voting with amount %s fails: %s', async (amount, fails) => {
			const threadAtStart = await Threads.getById(createdThread.id, loggedInUser.id)
			const messageAtStart = threadAtStart.messages[0]

			const newVote = {
				'amount': amount
			}
			await api
				.post(`${messagesUrl}/${messageAtStart.id}`)
				.set('Authorization', token)
				.send(newVote)
				.expect(fails ? 422 : 200)
				.expect('Content-Type', /application\/json/)
		})
	})

	// describe('and user2 is logged in', () => {
	// 	beforeEach(async () => {
	// 		const response = await api
	// 			.post(loginUrl)
	// 			.send(user2)
	// 		token = 'bearer ' + response.body.token
	// 		loggedInUser = response.body.user
	// 	})

	// 	it('thread writer id is shown correctly', async () => {

	// 	})
	// }
})

afterAll(() => {
	conn.end()
})