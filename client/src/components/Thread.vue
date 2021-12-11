<template>
	<div id="thread">
		<message v-for="message in data.messages" :key="message.id" :writerIdInThread="data.yourWriterId" :message_data="message"/>
		<NewMessage :threadId="this.threadId" @update-thread="updateThread"/>
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
		threadId: Number
	},
	methods: {
		/**
		 * Used to get data from the server for a thread with a specific id.
		 * @param threadId Id of the thread.
		 * @returns {Promise<void>}
		 */
		async getThreadDataById (threadId) {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.get('/api/threads/' + threadId, {
					headers: {
						Authorization: `bearer ${window.accessToken}`
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
		/**
		 * Used to update data on the thread.
		 * @param data is an object that contains all necessary data for the thread.
		 */
		updateThread (data) {
			this.data = data
		}
	},
	created () {
		this.getThreadDataById(this.threadId)
	}
}

</script>

<style scoped>

</style>
