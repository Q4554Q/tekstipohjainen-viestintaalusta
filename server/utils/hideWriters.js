/**
 * Removes writer (=user) ids from the given thread's data.
 * Each user that has posted in this thread will be given a unique
 * writerId (a running number) in the order in which they posted in this thread.
 * The logged in user's own writerId is returned as a property of the thread.
 * @param {*} thread The thread which id's are removed.
 * @param {*} user The logged in user.
 */
const hideWriters = (thread, user) => {
	delete thread.writerId
	thread.yourWriterId = -1

	const writerIds = []
	for (let i = 0; i < thread.messages.length; i++) {
		let message = thread.messages[i]
		const { writerId } = message
		if (!writerIds.includes(writerId)) writerIds.push(writerId)
		message.writerId = writerIds.indexOf(writerId) + 1

		if (writerId === user.id) thread.yourWriterId = writerIds.indexOf(writerId) + 1
	}
}

module.exports = hideWriters