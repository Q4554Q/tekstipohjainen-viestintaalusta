<template>
<div id="newmessage" class="container p-3 my-3 border rounded">
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
			<button @click="handleNewMessage" class="btn btn-primary btn-sm mt-3">Send message  <SendmessageIcon id="send-message-icon"/></button>
		</div>
</div>
</template>

<script>
import SendmessageIcon from '../assets/SendmessageIcon'

export default {
	name: 'NewMessage.vue',
	components: { SendmessageIcon },
	data () {
		return {
			message: ''
		}
	},
	methods: {
		handleNewMessage () {
			// otetaan message ja luodaan uusi Message-olio
		}
	}
}
</script>

<style scoped>
#newmessage {
	max-width: 800px;
}
#send-message-icon{
	fill: white;
	height: 1.5em;
	width: 1.5em;
}
</style>
