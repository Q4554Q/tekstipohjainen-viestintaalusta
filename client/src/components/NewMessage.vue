<template>
<div id="newmessage" class="container p-3 my-3 rounded-3">
		<div id="newMessageArea" class="text-center">
			<b-form-textarea
				v-model="message"
				size="lg"
				placeholder="Write a message"
				rows="5"
				no-resize
				maxlength="350"
			/>
			<div class="text-end"><small class="text-secondary">{{message.length}}/350</small></div>
			<button @click="handleNewMessage" class="btn btn-sm">Send message  <SendmessageIcon id="send-message-icon"/></button>
		</div>
</div>
</template>

<script>
import SendmessageIcon from '../assets/SendmessageIcon'
import axios from 'axios'

export default {
	name: 'NewMessage.vue',
	components: { SendmessageIcon },
	data () {
		return {
			message: ''
		}
	},
	props: {
		threadId: Number
	},
	methods: {
		async handleNewMessage () {
			this.pending = true
			this.error = 0

			try {
				await axios.post('/api/threads/' + this.threadId, {
					message: this.message
				}, {
					headers: {
						Authorization: `bearer ${window.accessToken}`
					}
				}).then(response => { this.$emit('update-thread', response.data) })

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
			this.message = ''
		}
	}
}
</script>

<style scoped>
#newmessage {
	max-width: 800px;
	background-color: #2e2e2e;
	color:#d1d1d1;
}
textarea {
	background-color: #2e2e2e;
	color:#d1d1d1;
	border-color: #8ed1c6;
	outline: 0;
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
