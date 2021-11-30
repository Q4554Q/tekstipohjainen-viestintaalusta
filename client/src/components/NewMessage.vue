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
			></b-form-textarea>
			<button @click="handleNewMessage" class="btn btn-primary btn-sm mt-3">Send message</button>
		</div>
</div>
</template>

<script>
export default {
	name: 'NewMessage.vue',
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
</style>
