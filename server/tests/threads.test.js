const supertest = require('supertest')
const each = require('jest-each').default
const app = require('../app')
const api = supertest(app)
const Topics = require('../model/topics')
const Threads = require('../model/threads')
const { conn } = require('../db')

const { threadsUrl, testUsers, resetDatabase, createUser, loginUser, createThread, postMessage, messagesUrl } = require('./helpers')
let topics

beforeAll(async () => {
	topics = await Topics.getAll()
})

describe('when there are initially two users and a thread by user1 with a second comment by user1 in the database', () => {
	let loggedInUser
	let testThreads

	beforeEach(async () => {
		await resetDatabase()
		await createUser(testUsers[0])
		await createUser(testUsers[1])

		loggedInUser = await loginUser(testUsers[0])
		testThreads = []
		testThreads.push(await createThread(loggedInUser.id))
		await postMessage(loggedInUser.id, testThreads[0].id)
	})

	describe('and the user is not logged in', () => {
		beforeEach(() => {
			loggedInUser.token = ''
		})

		it('no threads are returned', async () => {
			const response = await getThread('', 401)

			expect(response.body.error).toBe('token missing or invalid')
			expect(response.body.length).not.toBeDefined()
		})

		it('a single thread is not returned', async () => {
			const response = await getThread(testThreads[0].id, 401)

			expect(response.body.error).toBe('token missing or invalid')
			expect(response.body.messages).not.toBeDefined()
		})

		it('a thread cannot be created', async () => {
			const threadsAtStart = await Threads.getAll(0, 1000, loggedInUser.id)

			const message = 'Toinen viestiketju'
			const response = await postThread('', { message }, 401)

			expect(response.body.error).toBe('token missing or invalid')

			const threadsAtEnd = await Threads.getAll(0, 1000, loggedInUser.id)
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length)
		})

		it('a message cannot be posted', async () => {
			const threadAtStart = await Threads.getById(testThreads[0].id, loggedInUser.id)

			const message = 'Testiviesti'
			const response = await postThread(testThreads[0].id, { message }, 401)

			expect(response.body.error).toBe('token missing or invalid')

			const threadAtEnd = await Threads.getById(testThreads[0].id, loggedInUser.id)
			expect(threadAtEnd.messages).toHaveLength(threadAtStart.messages.length)
		})
	})

	describe('and user1 is logged in', () => {
		beforeEach(async () => {
			loggedInUser = await loginUser(testUsers[0])
		})

		it('all threads can be viewed and have correct data', async () => {
			const response = await getThread('', 200)

			expect(response.body).toHaveLength(1)

			const thread = response.body[0]
			expect(thread.id).toBe(testThreads[0].id)
			expect(thread.topic).toEqual(topics[0])
			expect(thread.messages).toHaveLength(1)	// Only the first message is shown
			expect(thread.yourWriterId).toBe(1)
		})

		it('a single thread can be viewed and has correct data', async () => {
			const response = await getThread(testThreads[0].id, 200)

			const thread = response.body
			expect(thread.id).toBe(testThreads[0].id)
			expect(thread.topic).toEqual(topics[0])
			expect(thread.messages).toHaveLength(2)
			expect(thread.yourWriterId).toBe(1)
		})

		it('a new thread can be created', async () => {
			const threadsAtStart = await Threads.getAll(0, 1000, loggedInUser.id)

			const message = 'Toinen viestiketju'
			const topicId = 1
			const response = await postThread('', { message, topicId }, 201)

			const createdThread = response.body
			expect(createdThread.messages[0].content).toBe(message)
			expect(createdThread.topic.id).toBe(topicId)

			const threadsAtEnd = await Threads.getAll(0, 1000, loggedInUser.id)
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length + 1)
		})

		it('empty message won\'t create a new thread', async () => {
			const threadsAtStart = await Threads.getAll(0, 1000, loggedInUser.id)

			const message = ''
			const response = await postThread('', { message }, 422)

			expect(response.body.errors).toHaveLength(1)
			expect(response.body.errors[0].msg).toBe('The message must be between 1 and 350 characters')

			const threadsAtEnd = await Threads.getAll(0, 1000, loggedInUser.id)
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length)
		})

		it('thread cannot be created with a non existing topic id', async () => {
			const threadsAtStart = await Threads.getAll(0, 1000, loggedInUser.id)

			const message = 'Toinen viestiketju'
			const topicId = 2
			const response = await postThread('', { message, topicId }, 422)

			expect(response.body.errors).toHaveLength(1)
			expect(response.body.errors[0].msg).toBe('No topic was found with this id')

			const threadsAtEnd = await Threads.getAll(0, 1000, loggedInUser.id)
			expect(threadsAtEnd).toHaveLength(threadsAtStart.length)
		})

		it('a new message can be posted', async () => {
			const threadAtStart = await Threads.getById(testThreads[0].id, loggedInUser.id)

			const message = 'Lisätty viesti'
			const response = await postThread(threadAtStart.id, { message }, 201)

			const createdComment = response.body.messages[2]
			expect(createdComment.content).toBe(message)
			expect(createdComment.writerId).toBe(1)
			expect(createdComment.postedTime).toBeDefined()
			expect(createdComment.score).toBe(0)
			expect(createdComment.vote).toBe(0)

			const threadAtEnd = await Threads.getById(testThreads[0].id, loggedInUser.id)
			expect(threadAtEnd.messages).toHaveLength(threadAtStart.messages.length + 1)
		})

		each([
			[0, 5, [0, 1, 2, 3, 4]],
			[2, 2, [2, 3]],
			[2, 1, [2]],
			[4, 5, [4]],
		]).test('threads are sent correctly paginated with offset: %s and limit: %s', async (offset, limit, returnedThreadIndexes) => {
			testThreads.push(await createThread(loggedInUser.id))
			testThreads.push(await createThread(loggedInUser.id))
			testThreads.push(await createThread(loggedInUser.id))
			testThreads.push(await createThread(loggedInUser.id))
			const threadsAtStart = await Threads.getAll(0, 1000, loggedInUser.id)

			const response = await api
				.get(`${threadsUrl}?offset=${offset}&limit=${limit}`)
				.set('Authorization', loggedInUser.token)

			const returnedThreads = response.body
			for (let i = 0; i < returnedThreads.length || i < returnedThreadIndexes.length; i++) {
				const thread = returnedThreads[i]
				const threadAtStart = threadsAtStart[returnedThreadIndexes[i]]
				expect(thread.id).toBe(threadAtStart.id)
			}
		})

		it('incorrect pagination values return an error ', async () => {
			const offset = 'a'
			const limit = 'b'
			const response = await api
				.get(`${threadsUrl}?offset=${offset}&limit=${limit}`)
				.set('Authorization', loggedInUser.token)
				.expect(422)

			expect(response.body.errors).toHaveLength(2)
		})

		it('own message can be deleted', async () => {
			const threadsAtStart = await Threads.getAll(0, 1000, loggedInUser.id)

			const response = await api
				.delete(`${messagesUrl}/${threadsAtStart[0].messages[1].id}`)
				.set('Authorization', loggedInUser.token)

			const returnedMessage = response.body
			expect(returnedMessage.removed).toBe(1)
			expect(returnedMessage.content).not.toBeDefined()

			const threadsAtEnd = await Threads.getAll(0, 1000, loggedInUser.id)
			const messageAtEnd = threadsAtEnd[0].messages[1]
			expect(messageAtEnd.removed).toBe(1)
		})
	})

	describe('and user2 is logged in', () => {
		beforeEach(async () => {
			loggedInUser = await loginUser(testUsers[1])
		})

		it('writer id is shown correctly in a new thread', async () => {
			const message = 'Aloitusviesti'
			const response = await postThread('', { message }, 201)

			const createdThread = response.body
			expect(createdThread.yourWriterId).toBe(1)
			expect(createdThread.messages[0].writerId).toBe(1)
		})

		it('writer id is shown correctly in another user\'s thread', async () => {
			const threadAtStart = await Threads.getById(testThreads[0].id, loggedInUser.id)

			const message = 'Toisen käyttäjän viesti'
			const response = await postThread(threadAtStart.id, { message }, 201)

			const updatedThread = response.body
			expect(updatedThread.yourWriterId).toBe(2)
			expect(updatedThread.messages[2].writerId).toBe(2)
			expect(updatedThread.messages[0].writerId).toBe(1)
		})

		it('another user\'s message cannot be deleted', async () => {
			const threadsAtStart = await Threads.getAll(0, 1000, loggedInUser.id)

			const response = await api
				.delete(`${messagesUrl}/${threadsAtStart[0].messages[1].id}`)
				.set('Authorization', loggedInUser.token)
				.expect(401)

			expect(response.body.error).toBe('you can only remove your own messages')
		})
	})

	const getThread = async (threadId, expectedCode) => {
		const url = threadId
			? `${threadsUrl}/${threadId}`
			: `${threadsUrl}?offset=0&limit=1000`

		return await api
			.get(url)
			.set('Authorization', loggedInUser.token)
			.expect(expectedCode)
			.expect('Content-Type', /application\/json/)
	}

	const postThread = async (threadId, payload, expectedCode) => {
		const url = threadId
			? `${threadsUrl}/${threadId}`
			: threadsUrl

		return await api
			.post(url)
			.set('Authorization', loggedInUser.token)
			.send(payload)
			.expect(expectedCode)
			.expect('Content-Type', /application\/json/)
	}
})

afterAll(() => {
	conn.end()
})