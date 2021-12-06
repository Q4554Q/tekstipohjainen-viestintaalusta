<template>
	<div id="thread-list">
			<OpeningMessage v-for="thread in threadData" :key="thread.id" v-bind:messageData="thread.messages[0]"
							v-bind:numMessages="thread.numMessages" v-bind:writerIdInThread="thread.yourWriterId"
							@message-clicked="$emit('open-thread', thread.id)"/>
	</div>
</template>

<script>
import OpeningMessage from './OpeningMessage'
import axios from 'axios'

export default {
	name: 'ThreadList',
	components: {
		OpeningMessage
	},
	data () {
		return {
			threadData: []
		}
	},
	created () {
		this.getThreads()
	},
	methods: {
		async getThreads () {
			this.pending = true
			this.error = 0

			try {
				const { data } = await axios.get('/api/threads', {
					headers: {
						Authorization: `bearer ${window.accessToken}`
					}
				})

				this.threadData = data
				console.log(this.threadData)

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
		}
	}
}
</script>

<style scoped>

</style>
