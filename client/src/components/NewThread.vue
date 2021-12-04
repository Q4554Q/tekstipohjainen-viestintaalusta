<template>
	<div id="new-thread" class="container p-3 my-3 border rounded">
		<div id="newthreadfield" class="text-center">
			<b-form-textarea
				v-model="message"
				size="lg"
				placeholder="Begin a new thread with a message"
				rows="5"
				no-resize
				maxlength="350"
			/>
			<div class="text-end"><small class="text-secondary"><b-icon icon="clock"/>{{message.length}}/350</small></div>
			<button @click="createNewThread" class="btn btn-primary btn-sm mt-3">Create thread <SendmessageIcon id="send-message-icon"/></button>
		</div>
		<div v-if="pending" class="row justify-content-center">
			<b-spinner variant="primary" class="mt-3"></b-spinner>
		</div>
		<b-alert v-model="error" variant="danger" class="mt-3">
			{{ errorMessage }}
		</b-alert>
	</div>
</template>

<script>
import SendmessageIcon from '../assets/SendmessageIcon'
import axios from 'axios'

export default {
	name: 'NewThread.vue',
	components: { SendmessageIcon },
	props: {
		token: String
	},
	data () {
		return {
			message: '',
			pending: false,
			error: 0,
			errorMessage: ''
		}
	},
	methods: {
		async createNewThread () {
			this.pending = true
			this.error = 0

			try {
				await axios.post('/api/threads', {
					message: this.message
				}, {
					headers: {
						Authorization: `bearer ${this.token}`
					}
				})

				this.$emit('thread-created')
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
#new-thread {
	max-width: 800px;
}

#send-message-icon{
	fill: white;
	height: 1.5em;
	width: 1.5em;
}
</style>
