const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Users = require('../model/users')
const Threads = require('../model/threads')
const Messages = require('../model/messages')

const loginUrl = '/api/login'
const usersUrl = '/api/users'
const topicsUrl = '/api/topics'
const threadsUrl = '/api/threads'
const messagesUrl = '/api/messages'

const testUsers = [
	{
		username: 'testikäyttäjä1',
		password: 'Salasana1'
	},
	{
		username: 'testikäyttäjä2',
		password: 'Sal4sana1'
	}
]

/**
 * Removes all data from the database, except for the topics.
 */
const resetDatabase = async () => {
	await Messages.deleteAllVotes()
	await Messages.deleteAll()
	await Threads.deleteAll()
	await Users.deleteAll()
}

/**
 * Adds the given user to the database.
 * @param {*} user The user to create.
 */
const createUser = async (user) => {
	await Users.create({
		username: user.username,
		passwordHash: await bcrypt.hash(user.password, 10)
	})
}

/**
 * Logs the given user in.
 * @param {*} user The user to log in.
 * @returns The logged in user and the access token.
 */
const loginUser = async (user) => {
	const response = await api
		.post(loginUrl)
		.send(user)

	return {
		...response.body.user,
		token: 'bearer ' + response.body.token
	}
}

/**
 * Creates a new dummy thread.
 * @param {*} writerId The id of the user that creates this thread.
 * @returns The created thread.
 */
const createThread = async (writerId) => {
	// Needed so that multiple thread's aren't created at the same time
	// and retrieved from the db in a messed up order
	await sleep(1000)

	const newThread = {
		topicId: 1,
		writerId: writerId
	}
	const firstMessage = {
		writerId: writerId,
		indexInThread: 1,
		content: 'Aloitusviesti',
	}
	return await Threads.create(newThread, firstMessage)
}

/**
 * Posts a new dummy message in the specified thread.
 * @param {*} writerId The id of the user that posts the message.
 * @param {*} threadId The id of the thread in which the message is posted.
 */
const postMessage = async (writerId, threadId) => {
	await Threads.addMessage({
		threadId: threadId,
		writerId: writerId,
		content: 'Testiviesti',
	})
}

/**
 * Pauses the server's execution for a given amount of time.
 * @param {*} ms Time to sleep in milliseconds.
 * @returns A promise.
 */
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms)
	})
}

module.exports = {
	loginUrl,
	usersUrl,
	topicsUrl,
	threadsUrl,
	messagesUrl,
	testUsers,
	resetDatabase,
	createUser,
	loginUser,
	createThread,
	postMessage,
}