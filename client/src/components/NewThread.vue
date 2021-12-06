<template>
	<div id="new-thread" class="container p-3 my-3 rounded-3">
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
			<button @click="createNewThread" class="btn btn-sm mt-3">Create thread <SendmessageIcon id="send-message-icon"/></button>
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
						Authorization: `bearer ${window.accessToken}`
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
	background-color: #2e2e2e;
	color:#d1d1d1;
}
textarea {
	background-color: #2e2e2e;
	color:#d1d1d1;
	border-color: #8ed1c6;
}
textarea:focus {
	background-color: #2e2e2e;
	color:#d1d1d1;
	border-color: #8ed1c6;
	outline: 0;

	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);

}
button {
	background-color: #2e2e2e;
	color: #8ed1c6;
	border-color: #8ed1c6;
}
button:focus {
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(142, 209, 198,.6);
}
button:hover {
	color: #8ed1c6;
}
#send-message-icon{
	fill: #8ed1c6;
	height: 1.5em;
	width: 1.5em;
}
</style>
