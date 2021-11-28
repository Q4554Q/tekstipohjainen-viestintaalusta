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