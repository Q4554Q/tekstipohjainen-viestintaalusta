<template>
	<div id="thread">
		<message v-for="message in data.messages" :key="message.id" v-bind:writerIdInThread="data.yourWriterId" v-bind:message_data="message"></message>
		<NewMessage :threadId="this.threadId" :token="token" @update-thread="updateThread"></NewMessage>
	</div>
</template>

<script>

import Message from './Message'
import NewMessage from './NewMessage'
import axios from 'axios'

export default {
	name: 'Thread',
	components: {
		Message,
		NewMessage
	},
	data () {
		return {
			data: {}
		}
	},
	props: {
		threadId: Number,
		token: String
	},
	methods: {
		async getThreadsById (threadId) {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.get('/api/threads/' + threadId, {
					headers: {
						Authorization: `bearer ${this.token}`
					}
				})

				this.data = data
				console.log(this.data)

				this.error = 0
			} catch (error) {
				this.error = 5
				if (error.response) {
					this.errorMessage = error.response.data.error
				} else {
					this.errorMessage = error.message
				}
			}
			this.pending = false
		},
		updateThread (messages) {
			this.data = messages
		}
	},
	created () {
		this.getThreadsById(this.threadId)
	}
}

</script>

<style scoped>

</style>
