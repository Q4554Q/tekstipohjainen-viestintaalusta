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

const resetDatabase = async () => {
	await Messages.deleteAllVotes()
	await Messages.deleteAll()
	await Threads.deleteAll()
	await Users.deleteAll()
}

const createUser = async (user) => {
	await Users.create({
		username: user.username,
		passwordHash: await bcrypt.hash(user.password, 10)
	})
}

const loginUser = async (user) => {
	const response = await api
		.post(loginUrl)
		.send(user)

	return {
		...response.body.user,
		token: 'bearer ' + response.body.token
	}
}

const createThread = async (writerId) => {
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

const postMessage = async (writerId, threadId) => {
	await Threads.addMessage({
		threadId: threadId,
		writerId: writerId,
		content: 'Testiviesti',
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